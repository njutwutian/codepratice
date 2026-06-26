package com.wow.goldenmount.common.enums;

public enum ErrorCode {
    INVALID_PARAM("GM-400", "invalid request parameter"),
    SOURCE_NOT_FOUND("GM-404-SOURCE", "source system not found"),
    EVENT_NOT_FOUND("GM-404-EVENT", "event record not found"),
    EVENT_DUPLICATED("GM-409-EVENT", "event request id already exists"),
    INTERNAL_ERROR("GM-500", "internal server error");

    private final String code;
    private final String message;

    ErrorCode(String code, String message) {
        this.code = code;
        this.message = message;
    }

    public String getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }
}