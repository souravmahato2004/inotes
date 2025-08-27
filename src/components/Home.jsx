import { useAlert } from "../context/Alert/AlertContext";
import Notes from "./Notes";
import AddNote from "./AddNote";
export default function Home() {
  const { showAlert } = useAlert();
  return (
    <>
      <div className="container">
        <AddNote />
        <Notes />
      </div>
    </>
  );
}
