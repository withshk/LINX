package LINX.linx.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;

@Getter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ApiResponse<T> {

    private final boolean success;
    private final String message;
    private final T data;
    private final Long expiresIn;

    private ApiResponse(boolean success, String message, T data, Long expiresIn) {
        this.success = success;
        this.message = message;
        this.data = data;
        this.expiresIn = expiresIn;
    }

    public static <T> ApiResponse<T> success(T data) {
        return new ApiResponse<>(true, null, data, null);
    }

    public static <T> ApiResponse<T> success(String message, T data) {
        return new ApiResponse<>(true, message, data, null);
    }

    public static <T> ApiResponse<T> success(String message) {
        return new ApiResponse<>(true, message, null, null);
    }

    public static <T> ApiResponse<T> success(String message, long expiresIn) {
        return new ApiResponse<>(true, message, null, expiresIn);
    }
}
