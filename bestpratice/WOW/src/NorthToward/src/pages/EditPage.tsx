import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getEventById } from "../api/client";
import { toErrorMessage } from "../api/errors";
import ErrorBanner from "../components/ErrorBanner";
import type { EventRecord } from "../api/types";

const EditPage = () => {
  const { id = "" } = useParams();
  const [event, setEvent] = useState<EventRecord | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!id) {
      setErrorMessage("缺少 eventId");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    getEventById(id)
      .then((data) => {
        setEvent(data);
      })
      .catch((error: unknown) => {
        setErrorMessage(toErrorMessage(error));
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);

  return (
    <section className="page-card">
      <div className="page-head">
        <h2>编辑事件</h2>
        {id ? <Link to={`/events/${id}`}>返回详情</Link> : null}
      </div>

      {errorMessage && <ErrorBanner message={errorMessage} />}

      {isLoading ? (
        <p>加载中...</p>
      ) : (
        <div className="detail-body">
          <p>API v1 暂未提供编辑接口，当前页面用于展示待编辑事件信息。</p>
          {event ? (
            <pre className="json-block">{JSON.stringify(event, null, 2)}</pre>
          ) : (
            <p>未获取到事件数据。</p>
          )}
        </div>
      )}
    </section>
  );
};

export default EditPage;
