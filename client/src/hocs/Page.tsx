import { ReactElement, useEffect } from "react";

interface PageProps {
  title: string;
  children: ReactElement;
}
const Page: React.FC<PageProps> = ({ children, title }) => {
  useEffect(() => {
    document.title = title;
  }, [title]);
  return children;
};

export default Page;
