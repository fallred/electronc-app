import grpc
import example_pb2
import example_pb2_grpc

class ExampleServicer(example_pb2_grpc.ExampleServicer):
    def Add(self, request, context):
        return example_pb2.AddResponse(result=request.x + request.y)

def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    example_pb2_grpc.add_ExampleServicer_to_server(ExampleServicer(), server)
    server.add_insecure_port('[::]:50051')
    server.start()
    print("Server started on port 50051")
    server.wait_for_termination()