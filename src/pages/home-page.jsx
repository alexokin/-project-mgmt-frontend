import ClientAdd from "../cmps/client-add";
import Clients from "../cmps/clients";
import ProjectAdd from "../cmps/project-add";
import Projects from "../cmps/projects";

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
