package com.wow.goldenmount.module.event.mapper;

import com.wow.goldenmount.module.event.domain.entity.SourceSystemDO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface SourceSystemMapper {

    @Select("""
            SELECT id, source_code, source_name, source_status, created_at, updated_at
            FROM gm_source_system
            WHERE source_code = #{sourceCode}
            """)
    @Results(id = "sourceSystemResultMap", value = {
            @Result(property = "id", column = "id"),
            @Result(property = "sourceCode", column = "source_code"),
            @Result(property = "sourceName", column = "source_name"),
            @Result(property = "sourceStatus", column = "source_status"),
            @Result(property = "createdAt", column = "created_at"),
            @Result(property = "updatedAt", column = "updated_at")
    })
    SourceSystemDO findBySourceCode(String sourceCode);
}