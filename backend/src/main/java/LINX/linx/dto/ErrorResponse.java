package LINX.linx.dto;

import lombok.Getter;

@Getter
public class ErrorResponse {

    private final boolean success;
    private final String errorCode;
    private final String message;

    public ErrorResponse(String errorCode, String message) {
        this.success = false;
        this.errorCode = errorCode;
        this.message = message;
    }

}
