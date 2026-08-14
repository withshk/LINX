package LINX.linx.dto.common;

import LINX.linx.dto.LinkResponse;
import lombok.Getter;

import java.util.List;

@Getter
public class ApiResponse<T> {

    private final boolean success;
    private final T data;

    private ApiResponse(boolean success, T data) {
        this.success = success;
        this.data = data;
    }

    public static <T> ApiResponse<T> success(T data) {
        return new ApiResponse<>(true, data);
    }
}
