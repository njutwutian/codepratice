FROM m.daocloud.io/docker.io/library/maven:3.9.9-eclipse-temurin-17 AS builder

WORKDIR /workspace

# ========== 关键优化开始 ==========
# 1. 只先复制 pom.xml
COPY pom.xml ./

# 2. 提前下载所有依赖包（利用 Docker 层缓存）
#    只要 pom.xml 不变，这一层永远命中缓存，永远不会重新下载！
RUN mvn -B dependency:go-offline

# 3. 等依赖都下载好了，再复制源代码（此时才引入代码变动）
COPY src ./src

# 4. 执行编译打包（此时依赖已在本地仓库，maven 只会增量编译变更的 java 文件，秒级完成）
RUN mvn -B -DskipTests package
# ========== 优化结束 ==========

FROM m.daocloud.io/docker.io/library/eclipse-temurin:17-jre

WORKDIR /app

ENV APP_PORT=8080
ENV SPRING_PROFILES_ACTIVE=prod
ENV JAVA_OPTS=""

COPY --from=builder /workspace/target/golden-mount-0.0.1-SNAPSHOT.jar /app/app.jar

EXPOSE 8080

ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar /app/app.jar --server.port=${APP_PORT} --spring.profiles.active=${SPRING_PROFILES_ACTIVE}"]