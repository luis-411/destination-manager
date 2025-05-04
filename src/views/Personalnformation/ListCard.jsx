import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import GoToMapCountryButton from "../../components/GoToMapCountry";
import styles from "../../views/Personalnformation/ListCard.module.css";
import useSelectedList from "../../api/useSelectedList";
import { FaEdit, FaTrash, FaShareAlt } from "react-icons/fa";
import useLists from "../../api/useLists";
import { message } from "antd";
import { useAuthContextSupabase } from "../../context/AuthContextSupabase";
import useRightColumnOpen from "../GeneralView/services/useRightColumnOpen";

const ListCard = ({ 
    title: initialTitle,
    description: initialDescription,
    regions: initialRegions,
    emoji: initialEmoji,
    id: initialId,
    link,
    updateLists }) => {
    const { user } = useAuthContextSupabase();
    const { fetchListByLink, deleteList } = useLists();
    const [listData, setListData] = useState({
      title: initialTitle,
      description: initialDescription,
      regions: initialRegions,
      emoji: initialEmoji,
      id: initialId,
    });
    const [isHovered, setIsHovered] = useState(false);

    const { generateLink } = useLists();
      const handleShare = async (listId) => {
        const link = await generateLink(listId);
        if (link) {
          const url = `${window.location.origin}/public-list/${link}`;
          navigator.clipboard.writeText(url);
          message.success("Shareable link copied to clipboard!");
        } else {
          message.error("Failed to generate shareable link.");
        }
      };
  
    useEffect(() => {
      const fetchData = async () => {
        if (link) {
          try {
            const list = await fetchListByLink(link);
            if (list) {
              setListData({
                title: list.title,
                description: list.description,
                regions: list.regions,
                emoji: list.emoji,
                id: list.id,
              });
            }
          } catch (error) {
            console.error("Error fetching list by link:", error);
          }
        }
      };
  
      fetchData();
    }, [link, fetchListByLink]);
  
    const { setSelectedList } = useSelectedList();
    const { setRightColumnOpen } = useRightColumnOpen();
    const handleClick = () => {
      console.log(listData);
      setSelectedList(listData);
      setRightColumnOpen(true);
    };
  
    const handleDelete = async () => {
      const confirmDelete = window.confirm("Are you sure you want to delete this list?");
      if (!confirmDelete) return;
  
      try {
        await deleteList(listData.id); // Call deleteList with the list ID
        updateLists();
      } catch (error) {
        console.error("Error deleting list:", error);
      }
    };
  
    return (
      <Card
        className="list-card shadow-sm rounded-4"
        style={{
          width: "100%",
          margin: "1rem 0",
          padding: "1.5rem",
          border: "1px solid #ddd",
          transition: "transform 0.2s ease-in-out",
          position: "relative", // Ensure buttons are positioned correctly
        }}
        onMouseEnter={() => setIsHovered(true)} // Show icons on hover
        onMouseLeave={() => setIsHovered(false)} // Hide icons when not hovering
        //onClick={handleClick}
      >
        <Card.Body>
          <div style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}>
            <span
              style={{
                fontSize: "2.5rem",
                marginRight: "1rem",
              }}
            >
              {listData.emoji || "🌍"}
            </span>
            <div>
              <Card.Title style={{ fontWeight: "700", fontSize: "1.5rem" }}>{listData.title}</Card.Title>
              <Card.Subtitle style={{ fontSize: "1rem" }}>
                {listData.description || ""}
              </Card.Subtitle>
            </div>
          </div>
          <h6 className={`fa-xs lh-1 m-0 fw-bold line-height: initial; ${styles.groupRegions}`}>
                {listData.regions?.length > 0 ? listData.regions.map(region => (
                  <GoToMapCountryButton key={region.value.id} regionId={region.value.id} showText={true} text={region.label} />
                )) : 'No regions yet'}
          </h6>
          <Button variant="primary" style={{ marginTop: "1rem" }} onClick={handleClick}>
            View Details
          </Button>
        </Card.Body>
        {isHovered && user && (
          <div
            style={{
              position: "absolute",
              bottom: "10px", // Position at the bottom right corner
              right: "10px",
              display: "flex",
              gap: "10px",
            }}
          >
            <FaEdit
              color="white"
              size={16}
              style={{ cursor: "pointer" }}
              onClick={(e) => {
                e.stopPropagation(); // Prevent triggering the card click
                console.log("Edit clicked");
              }}
            />
            <FaTrash
              color="white"
              size={16}
              style={{ cursor: "pointer" }}
              onClick={(e) => {
                e.stopPropagation(); // Prevent triggering the card click
                handleDelete();
              }}
            />
            <FaShareAlt
              color="white"
              size={16}
              style={{ cursor: "pointer" }}
              onClick={(e) => {
                e.stopPropagation(); // Prevent triggering the card click
                handleShare(listData.id);
              }}
            />
          </div>
        )}
      </Card>
    );
};

export default ListCard;