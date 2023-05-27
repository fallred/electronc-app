syntax = "proto3";

package example;

service Example {
    rpc Add(AddRequest) returns (AddResponse);
}

message AddRequest {
    int32 x = 1;
    int32 y = 2;
}

message AddResponse {
    int32 result = 1;
}