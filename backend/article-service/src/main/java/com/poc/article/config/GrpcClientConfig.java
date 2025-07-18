package com.poc.article.config;

import com.poc.article.grpc.AuthServiceGrpc;
import io.grpc.ManagedChannel;
import io.grpc.ManagedChannelBuilder;

import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class GrpcClientConfig {

    @Value("${grpc.auth-service.host}")
    private String host;

    @Value("${grpc.auth-service.port}")
    private int port;

    @Bean
    public AuthServiceGrpc.AuthServiceBlockingStub authServiceBlockingStub() {
        ManagedChannel channel = ManagedChannelBuilder
                .forAddress(host, port)
                .keepAliveTime(30, TimeUnit.SECONDS) // 🔁 send keep-alive every 30s
                .keepAliveTimeout(10, TimeUnit.SECONDS) // ⏰ wait 10s for ack
                .keepAliveWithoutCalls(true) // ✅ send even with no RPCs in flight
                .usePlaintext()
                .build();
        return AuthServiceGrpc.newBlockingStub(channel);
    }
}
