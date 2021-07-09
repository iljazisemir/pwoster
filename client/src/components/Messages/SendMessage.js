import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getMessages, sendMessage } from "../../actions/message.actions";
import ChevronSend from "../../styles/assets/svg/chevronSend";

const SendMessage = ({ messageId, senderId }) => {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (message) {
      await dispatch(sendMessage(messageId, senderId, message));
      dispatch(getMessages());
      setMessage("");
    } else {
      alert("Veuillez entrer un message");
    }
  };

  // useEffect(() => {
  //   setInterval(() => {
  //     dispatch(getMessages());
  //   }, 2000);
  // });

  return (
    <form className="bottom-input-conversation">
      <input
        type="text"
        name="send-message"
        id="send-message"
        autoComplete="off"
        onChange={(e) => setMessage(e.target.value)}
        value={message}
        className="input-message"
        placeholder="Démarrer un nouveau message"
      />
      <button onClick={handleSendMessage} className="button-chevron-send">
        {" "}
        <ChevronSend className="svg-send-message" />
      </button>
    </form>
  );
};

export default SendMessage;
