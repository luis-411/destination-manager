import { useContext, useEffect } from "react";
import { AuthContextSupabase } from "../../context/AuthContextSupabase";
import VisitCard from "./VisitCard";
import useVisitsStore from "../../api/useVisitStore";

const Visits = () => {
  const { user } = useContext(AuthContextSupabase);
  const visits = useVisitsStore((state) => state.visits);
  const deleteVisit = useVisitsStore((state) => state.deleteVisit);
  const fetchVisits = useVisitsStore((state) => state.fetchVisits);
  const isLoading = useVisitsStore((state) => state.isLoading);

  useEffect(() => {
    if (user) {
      fetchVisits();
    }
  }, [user, fetchVisits]);

  if (!user) {
    return <div>Please log in to view your visits.</div>;
  }

  if (isLoading) {
    return <div>Loading your visits...</div>;
  }


  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this visit?");
    if (!confirmDelete) return;
    try {
      await deleteVisit(id);
      // Optionally, you can call fetchVisits() here to refresh
    } catch (error) {
      console.error("Error deleting visit:", error);
    }
  };

  return (
    <div>
      {visits.length === 0 ? (
        <p>You have not added any visits yet.</p>
      ) : (
        visits
          .filter((visit) => visit.user_id === user.id)
          .sort((a, b) => new Date(b.arrive) - new Date(a.arrive))
          .map((visit) => (
            <VisitCard
              key={visit.id}
              id={visit.id}
              title={visit.title}
              description={visit.description}
              regionName={visit.region_name}
              regionId={visit.region_id}
              arriveDate={visit.arrive}
              departDate={visit.depart}
              onDelete={() => handleDelete(visit.id)}
            />
          ))
      )}
    </div>
  );
};

export default Visits;
