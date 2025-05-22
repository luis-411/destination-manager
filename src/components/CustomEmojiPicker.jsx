import EmojiPicker from "emoji-picker-react";
import { useState, useEffect, useRef } from "react";

const CustomEmojiPicker = ({ emoji, setEmoji }) => {
    const [showEmojiPicker, setShowEmojiPicker] = useState(false); // State to toggle emoji picker
    const emojiPickerRef = useRef(null);

    const onEmojiClick = (emojiObject) => {
        setEmoji(emojiObject.emoji); // Set the selected emoji
        setShowEmojiPicker(false); // Close the emoji picker
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
                setShowEmojiPicker(false); // Close the emoji picker
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    return (
        <div>
            <div className="d-flex align-items-center gap-2">
                <button
                    className="btn btn-light"
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    style={{ fontSize: "1.5rem", backgroundColor: "rgba(27,64,77,1)" }}
                >
                    {emoji || "🌍"}
                </button>
                {showEmojiPicker && (
                    <div ref={emojiPickerRef} style={{ position: "absolute", zIndex: 1000 }}>
                        <EmojiPicker className="emoji-picker-react" onEmojiClick={onEmojiClick} lazyLoadEmojis style={{ backgroundColor: "rgba(27,64,77,1)" }} skinTonesDisabled />
                    </div>
                )}
            </div>
        </div>

    );
}

export default CustomEmojiPicker;