import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <section className="page-card">
      <h2>页面不存在</h2>
      <p>你访问的路径不存在。</p>
      <Link to="/dashboard">返回首页</Link>
    </section>
  );
};

export default NotFoundPage;
