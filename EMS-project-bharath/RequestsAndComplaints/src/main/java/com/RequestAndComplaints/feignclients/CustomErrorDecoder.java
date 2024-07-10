package com.RequestAndComplaints.feignclients;



import feign.FeignException;
import feign.Response;
import feign.codec.ErrorDecoder;

public class CustomErrorDecoder implements ErrorDecoder {

    @Override
    public Exception decode(String methodKey, Response response) {
        if (response.status() == 400) {
            return new BadRequestException("Bad Request: " + response.reason());
        }
        return FeignException.errorStatus(methodKey, response);
    }
}

