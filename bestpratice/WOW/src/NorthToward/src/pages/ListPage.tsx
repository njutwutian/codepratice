import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getEvents } from "../api/client";
import { toErrorMessage } from "../api/errors";
import type { EventRecord } from "../api/types";
import ErrorBanner from "../components/ErrorBanner";

const ListPage = () => {
  const [events, setEvents] = useState<EventRecord[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    setIsLoading(true);
    setErrorMessage("");

    getEvents()
      .then((data) => {
        setEvents(data);
      })
      .catch((error: unknown) => {
        setErrorMessage(toErrorMessage(error));
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <section className="page-card">
      <div className="page-head">
        <h2>事件列表</h2>
      </div>

      {errorMessage && <ErrorBanner message={errorMessage} />}

      {isLoading ? <p>加载中...</p> : null}

      {!isLoading && !errorMessage && events.length === 0 ? <p>暂无数据</p> : null}

      {!isLoading && !errorMessage && events.length > 0 ? (
        <ul className="item-list">
          {events.map((event) => {
            return (
              <li key={event.eventId} className="item-list-row">
                <div>
                  <h3>Event #{event.eventId}</h3>
                  <p>requestId: {event.requestId}</p>
                  <p>sourceCode: {event.sourceCode}</p>
                  <p>eventType: {event.eventType}</p>
                  <p>eventStatus: {event.eventStatus}</p>
                  <small>eventTime: {event.eventTime}</small>
                </div>
                <div className="row-actions">
                  <Link to={`/events/${event.eventId}`}>详情</Link>
                </div>
              </li>
            );
          })}
        </ul>
      ) : null}
    </section>
  );
};

export default ListPage;
