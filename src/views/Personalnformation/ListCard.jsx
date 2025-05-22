import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import GoToMapCountryButton from "../../components/GoToMapCountry";
import styles from "../../views/Personalnformation/ListCard.module.css";
import useSelectedList from "../../api/useSelectedList";
import { FaEdit, FaTrash, FaShareAlt } from "react-icons/fa";
import useListsStore from "../../api/useListsStore";
import { message } from "antd";
import { useAuthContextSupabase } from "../../context/AuthContextSupabase";
import useRightColumnOpen from "../GeneralView/services/useRightColumnOpen";
import AddListView from "../PreferencesView/components/AddListView"; // Import AddListView

const ListCard = ({ 
    title: initialTitle,
    description: initialDescription,
    regions: initialRegions,
    emoji: initialEmoji,
    id: initialId,
    link,
    updateLists }) => {
    const { user } = useAuthContextSupabase();
    const fetchListByLink = useListsStore((state) => state.fetchListByLink);
    const fetchList = useListsStore((state) => state.fetchList);
    const deleteList = useListsStore((state) => state.deleteList);
    const updateList = useListsStore((state) => state.updateList);
    const generateLink = useListsStore((state) => state.generateLink);

    const [listData, setListData] = useState({
      title: initialTitle,
      description: initialDescription,
      regions: initialRegions,
      emoji: initialEmoji,
      id: initialId,
    });
    const [isHovered, setIsHovered] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const handleSave = async () => {
      try {
        await updateList(listData.id, {
          title: listData.title,
          description: listData.description,
          regions: listData.regions,
          emoji: listData.emoji,
        });
        message.success("List updated successfully!");
        setIsEditing(false);
        await fetchList();
      } catch (error) {
        console.error("Error updating list:", error);
        message.error("Failed to update list.");
      }
    };

    const handleCancel = () => {
      setIsEditing(false); // Exit edit mode without saving
    };

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
      setSelectedList(listData);
      setRightColumnOpen(true);
    };
  
    const handleDelete = async () => {
      const confirmDelete = window.confirm("Are you sure you want to delete this list?");
      if (!confirmDelete) return;
  
      try {
        await deleteList(listData.id);
        updateLists();
      } catch (error) {
        console.error("Error deleting list:", error);
      }
    };
  
    return (
      isEditing ? (
        <AddListView
          listEmoji={listData.emoji}
          setListEmoji={(emoji) => setListData((prev) => ({ ...prev, emoji }))}
          listRegions={listData.regions}
          setListRegions={(regions) => setListData((prev) => ({ ...prev, regions }))}
          handleTitleChange={(e) => setListData((prev) => ({ ...prev, title: e.target.value }))}
          handleDescriptionChange={(e) => setListData((prev) => ({ ...prev, description: e.target.value }))}
          addListSupabase={handleSave}
          handleCancel={handleCancel}
          titleValue={listData.title}
          descriptionValue={listData.description}
        />
      ) : (
        <Card
          className="list-card shadow-sm rounded-4"
          style={{
            width: "100%",
            margin: "1rem 0",
            padding: "1.5rem",
            border: "1px solid #ddd",
            transition: "transform 0.2s ease-in-out",
            position: "relative",
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
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
                  setIsEditing(true); // Enter edit mode
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
      )
    );
};

export default ListCard;