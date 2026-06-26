package com.wow.goldenmount.module.event.mapper;

import com.wow.goldenmount.module.event.domain.entity.EventRecordDO;
import com.wow.goldenmount.module.event.domain.entity.EventStatsGroupRow;
import com.wow.goldenmount.module.event.domain.entity.EventStatsTotalRow;
import java.util.List;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.ResultMap;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface EventRecordMapper {

    @Insert("""
            INSERT INTO gm_event_record
            (request_id, source_id, source_code, event_type, event_status, event_time, payload_count, payload_summary, created_at, updated_at)
            VALUES
            (#{requestId}, #{sourceId}, #{sourceCode}, #{eventType}, #{eventStatus}, #{eventTime}, #{payloadCount}, #{payloadSummary}, #{createdAt}, #{updatedAt})
            """)
    @Options(useGeneratedKeys = true, keyProperty = "id")
    int insert(EventRecordDO record);

    @Select("""
            SELECT id, request_id, source_id, source_code, event_type, event_status, event_time, payload_count, payload_summary, created_at, updated_at
            FROM gm_event_record
            WHERE request_id = #{requestId}
            """)
    @Results(id = "eventRecordResultMap", value = {
            @Result(property = "id", column = "id"),
            @Result(property = "requestId", column = "request_id"),
            @Result(property = "sourceId", column = "source_id"),
            @Result(property = "sourceCode", column = "source_code"),
            @Result(property = "eventType", column = "event_type"),
            @Result(property = "eventStatus", column = "event_status"),
            @Result(property = "eventTime", column = "event_time"),
            @Result(property = "payloadCount", column = "payload_count"),
            @Result(property = "payloadSummary", column = "payload_summary"),
            @Result(property = "createdAt", column = "created_at"),
            @Result(property = "updatedAt", column = "updated_at")
    })
    EventRecordDO findByRequestId(String requestId);

    @Select("""
            SELECT id, request_id, source_id, source_code, event_type, event_status, event_time, payload_count, payload_summary, created_at, updated_at
            FROM gm_event_record
            WHERE id = #{id}
            """)
    @ResultMap("eventRecordResultMap")
    EventRecordDO findById(Long id);

    @Select("""
            SELECT id, request_id, source_id, source_code, event_type, event_status, event_time, payload_count, payload_summary, created_at, updated_at
            FROM gm_event_record
            ORDER BY id DESC
            LIMIT #{limit}
            """)
    @ResultMap("eventRecordResultMap")
    List<EventRecordDO> findLatest(@Param("limit") int limit);

    @Select({
            "<script>",
            "SELECT COUNT(1) AS total_events, COALESCE(SUM(payload_count), 0) AS total_payload",
            "FROM gm_event_record",
            "<where>",
            "  <if test='eventType != null and eventType != \"\"'>",
            "    event_type = #{eventType}",
            "  </if>",
            "  <if test='eventStatus != null and eventStatus != \"\"'>",
            "    AND event_status = #{eventStatus}",
            "  </if>",
            "</where>",
            "</script>"
    })
    @Results(id = "eventStatsTotalResultMap", value = {
            @Result(property = "totalEvents", column = "total_events"),
            @Result(property = "totalPayload", column = "total_payload")
    })
    EventStatsTotalRow aggregateTotals(@Param("eventType") String eventType, @Param("eventStatus") String eventStatus);

    @Select({
            "<script>",
            "SELECT event_type AS label, COUNT(1) AS count",
            "FROM gm_event_record",
            "<where>",
            "  <if test='eventType != null and eventType != \"\"'>",
            "    event_type = #{eventType}",
            "  </if>",
            "  <if test='eventStatus != null and eventStatus != \"\"'>",
            "    AND event_status = #{eventStatus}",
            "  </if>",
            "</where>",
            "GROUP BY event_type",
            "ORDER BY count DESC",
            "</script>"
    })
    @Results(id = "eventStatsGroupResultMap", value = {
            @Result(property = "label", column = "label"),
            @Result(property = "count", column = "count")
    })
    List<EventStatsGroupRow> aggregateCountByType(@Param("eventType") String eventType, @Param("eventStatus") String eventStatus);

    @Select({
            "<script>",
            "SELECT event_status AS label, COUNT(1) AS count",
            "FROM gm_event_record",
            "<where>",
            "  <if test='eventType != null and eventType != \"\"'>",
            "    event_type = #{eventType}",
            "  </if>",
            "  <if test='eventStatus != null and eventStatus != \"\"'>",
            "    AND event_status = #{eventStatus}",
            "  </if>",
            "</where>",
            "GROUP BY event_status",
            "ORDER BY count DESC",
            "</script>"
    })
    @ResultMap("eventStatsGroupResultMap")
    List<EventStatsGroupRow> aggregateCountByStatus(@Param("eventType") String eventType, @Param("eventStatus") String eventStatus);
}