import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import path from "path";
import { verifyToken } from "../utils/jwt";
import {ServerUnaryCall, sendUnaryData} from "@grpc/grpc-js";
import { TokenRequest, TokenResponse  } from "../../proto/generated/validator";


const PROTO_PATH = path.join(__dirname, "../../proto/validator.proto");
const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const proto = grpc.loadPackageDefinition(packageDefinition) as any;

function validate(
  call: ServerUnaryCall<TokenRequest, TokenResponse>, 
  callback: sendUnaryData<TokenResponse>) {
  try {
    const decoded = verifyToken(call.request.token);
    callback(null, {
      valid: true,
      userId: decoded.userId,
      tenantId: decoded.tenantId,
    });
  } catch (e) {
    callback(null, { valid: false, userId: '', tenantId: '' });
  }
}

export function startGrpcServer() {
  const keepaliveOptions: grpc.ServerOptions = {
    // How often to send keepalive pings (in ms)
    "grpc.keepalive_time_ms": 60_000, // 1 minute

    // How long to wait for an acknowledgement (in ms)
    "grpc.keepalive_timeout_ms": 20_000, // 20 seconds

    // Allow pings without calls
    "grpc.keepalive_permit_without_calls": 1,
  };
  const server = new grpc.Server(keepaliveOptions);
  server.addService(proto.AuthValidator.service, { Validate: validate });
  server.bindAsync(
    "0.0.0.0:6565",
    grpc.ServerCredentials.createInsecure(),
    () => {
      console.log("gRPC server running on port 6565");
      server.start();
    }
  );
}
