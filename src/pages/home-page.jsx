import ClientAdd from "../cmps/client/client-add";
import Clients from "../cmps/client/clients";
import ProjectAdd from "../cmps/project/project-add";
import Projects from "../cmps/project/projects";

export default function HomePage() {
  return (
    <>
      <div className="d-flex gap-3 md-4">
        <ClientAdd />
        <ProjectAdd />
      </div>
      <Projects />
      <hr />
      <Clients />
    </>
  );
}
