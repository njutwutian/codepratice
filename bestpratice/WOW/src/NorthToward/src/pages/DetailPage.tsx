import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getEventById } from "../api/client";
import { toErrorMessage } from "../api/errors";
import type { EventRecord } from "../api/types";
import ErrorBanner from "../components/ErrorBanner";

const DetailPage = () => {
  const { id = "" } = useParams();
  const [event, setEvent] = useState<EventRecord | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>("");

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
        <h2>事件详情</h2>
        {id ? <Link to={`/events/${id}/edit`}>前往编辑</Link> : null}
      </div>

      {errorMessage && <ErrorBanner message={errorMessage} />}

      {isLoading ? <p>加载中...</p> : null}

      {!isLoading && !errorMessage && event ? (
        <article className="detail-body">
          <h3>Event #{event.eventId}</h3>
          <dl className="detail-grid">
            <div>
              <dt>requestId</dt>
              <dd>{event.requestId}</dd>
            </div>
            <div>
              <dt>sourceCode</dt>
              <dd>{event.sourceCode}</dd>
            </div>
            <div>
              <dt>sourceName</dt>
              <dd>{event.sourceName}</dd>
            </div>
            <div>
              <dt>eventType</dt>
              <dd>{event.eventType}</dd>
            </div>
            <div>
              <dt>eventStatus</dt>
              <dd>{event.eventStatus}</dd>
            </div>
            <div>
              <dt>eventTime</dt>
              <dd>{event.eventTime}</dd>
            </div>
            <div>
              <dt>payloadCount</dt>
              <dd>{event.payloadCount}</dd>
            </div>
            <div>
              <dt>payloadSummary</dt>
              <dd>{event.payloadSummary || "-"}</dd>
            </div>
            <div>
              <dt>createdAt</dt>
              <dd>{event.createdAt}</dd>
            </div>
          </dl>
        </article>
      ) : null}
    </section>
  );
};

export default DetailPage;
