import MainLayout from "./components/MainLayout";
import { useRouter } from "./services/stores/router";
import TaskList from "./pages/TaskList";
import Task from "./pages/Task";
import withSuspense from "@root/src/shared/hoc/withSuspense";

const App = () => {
  const { currentRoute } = useRouter();

  const routes = () => {
    switch (currentRoute) {
      case "/":
        return <TaskList />;
      case "/task":
        return <Task />;

      default:
        break;
    }
  };

  return <MainLayout>{routes()}</MainLayout>;
};

export default withSuspense(App);
