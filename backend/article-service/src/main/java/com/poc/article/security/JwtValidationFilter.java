package com.poc.article.security;

import com.poc.article.grpc.AuthServiceGrpc;
import com.poc.article.grpc.ValidateTokenRequest;
import com.poc.article.grpc.ValidateTokenResponse;
import io.grpc.StatusRuntimeException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtValidationFilter extends OncePerRequestFilter {

    private final AuthServiceGrpc.AuthServiceBlockingStub authService;

    public JwtValidationFilter(AuthServiceGrpc.AuthServiceBlockingStub authService) {
        this.authService = authService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        String header = request.getHeader("Authorization");
        if (header == null || !header.startsWith("Bearer ")) {
            response.sendError(HttpStatus.UNAUTHORIZED.value(), "Missing token");
            return;
        }

        String token = header.substring(7);

        try {
            ValidateTokenResponse grpcResponse = authService.validateToken(
                ValidateTokenRequest.newBuilder().setToken(token).build()
            );

            if (!grpcResponse.getValid()) {
                response.sendError(HttpStatus.UNAUTHORIZED.value(), "Token invalid");
                return;
            }

            // Optionally: set attributes for downstream use
            request.setAttribute("userId", grpcResponse.getUserId());
            request.setAttribute("tenantId", grpcResponse.getTenantId());

        } catch (StatusRuntimeException e) {
            response.sendError(HttpStatus.UNAUTHORIZED.value(), "Token validation failed");
            return;
        }

        filterChain.doFilter(request, response);
    }
}
