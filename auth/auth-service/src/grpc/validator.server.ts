import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import path from "path";
import { verifyToken } from "../utils/jwt";

const PROTO_PATH = path.join(__dirname, "../proto/validator.proto");
const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const proto = grpc.loadPackageDefinition(packageDefinition) as any;

function validate(call, callback) {
  try {
    const decoded = verifyToken(call.request.token);
    callback(null, {
      valid: true,
      userId: decoded.userId,
      tenantId: decoded.tenantId,
    });
  } catch (e) {
    callback(null, { valid: false });
  }
}

export function startGrpcServer() {
  const server = new grpc.Server();
  server.addService(proto.AuthValidator.service, { Validate: validate });
  server.bindAsync(
    "0.0.0.0:50051",
    grpc.ServerCredentials.createInsecure(),
    () => {
      console.log("gRPC server running on port 50051");
      server.start();
    }
  );
}
