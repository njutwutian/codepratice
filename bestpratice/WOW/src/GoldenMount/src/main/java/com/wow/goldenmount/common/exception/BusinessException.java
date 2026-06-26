package com.wow.goldenmount.common.exception;

import com.wow.goldenmount.common.enums.ErrorCode;

public class BusinessException extends RuntimeException {

    private final String code;

    public BusinessException(ErrorCode errorCode) {
        super(errorCode.getMessage());
        this.code = errorCode.getCode();
    }

    public BusinessException(ErrorCode errorCode, String message) {
        super(message);
        this.code = errorCode.getCode();
    }

    public String getCode() {
        return code;
    }
}