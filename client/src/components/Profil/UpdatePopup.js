import React, { useState } from "react";
import "../../styles/components/Profil/UpdatePopup.css";
import { useDispatch, useSelector } from "react-redux";
import {
  updateUser,
  uploadPictureCover,
  uploadPictureProfil,
} from "../../actions/user.actions";
import Button from "../Button";

// SVG
import CrossSvg from "../../styles/assets/svg/crossSvg";

const UpdatePopup = ({ popupUpdate, setPopupUpdate }) => {
  const userData = useSelector((state) => state.userReducer);
  const error = useSelector((state) => state.errorReducer.userError);
  const [bio, setBio] = useState(userData.bio);
  const [tweetName, setTweetName] = useState(userData.tweetName);
  const [fileProfil, setFileProfil] = useState();
  const [fileCover, setFileCover] = useState();
  const dispatch = useDispatch();

  const handleUpdate = () => {
    const dataProfil = new FormData();
    dataProfil.append("name", userData.pseudo);
    dataProfil.append("userId", userData._id);
    dataProfil.append("fileProfil", fileProfil);

    const dataCover = new FormData();
    dataCover.append("name", userData.pseudo);
    dataCover.append("userId", userData._id);
    dataCover.append("fileCover", fileCover);

    dispatch(updateUser(userData._id, bio, tweetName));
    dispatch(uploadPictureProfil(dataProfil, userData._id));
    dispatch(uploadPictureCover(dataCover, userData._id));
    setPopupUpdate(false);

    //   if (!error) {
    //     dispatch(updateUser(userData._id, bio, tweetName));
    //     dispatch(uploadPictureProfil(dataProfil, userData._id));
    //     dispatch(uploadPictureCover(dataCover, userData._id));
    //     setPopupUpdate(false);
    //   } else if (error) {
    //     console.log(error);
    //   }
  };

  return (
    <div className="popup-update-container">
      <div className="update-popup">
        <div className="top-container-update">
          <div className="left-top-update-container">
            <CrossSvg
              className="cross-popup-update"
              onClick={() => setPopupUpdate(false)}
            />
            <h3>Éditer le profil</h3>
          </div>
          <div className="right-top-update-container">
            <Button className="button-update" onClick={() => handleUpdate()}>
              Enregistrer
            </Button>
          </div>
        </div>
        <div className="cover-picture-update-container">
          <img
            id="coverPicture"
            src={userData.coverPicture}
            alt="Photo de couverture"
            className="cover-picture-update"
          />
        </div>
        <input
          type="file"
          id="fileCover"
          name="fileCover"
          accept=".jpg, .jpeg, .png"
          className="cover-input"
          onChange={(e) =>
            (document.getElementById("coverPicture").src =
              window.URL.createObjectURL(e.target.files[0])) &&
            setFileCover(e.target.files[0])
          }
        />
        <div className="profil-picture-container-update">
          <img
            id="profilePicture"
            src={userData.profilePicture}
            alt="Photo de profil"
            className="profil-picture-update"
          />
        </div>
        <input
          type="file"
          id="fileProfil"
          name="fileProfil"
          accept=".jpg, .jpeg, .png"
          className="picture-input"
          onChange={(e) =>
            (document.getElementById("profilePicture").src =
              window.URL.createObjectURL(e.target.files[0])) &&
            setFileProfil(e.target.files[0])
          }
        />
        <div className="form-container-update">
          <div className="input-form-update">
            <input
              type="text"
              name="tweetName"
              id="tweetName"
              minLength="1"
              maxLength="10"
              autoComplete="off"
              className="input-effect-update input-update"
              onChange={(e) => setTweetName(e.target.value)}
              defaultValue={tweetName}
            />
            <label htmlFor="tweetName">Nom</label>
          </div>
          <br />
          <div className="input-form-update">
            <textarea
              name="bio"
              id="bio"
              rows="3"
              maxLength="160"
              className="input-effect-update input-bio"
              onChange={(e) => setBio(e.target.value)}
              defaultValue={bio}
            />
            <label htmlFor="bio">Bio</label>
          </div>
        </div>
        <p>{error.maxSize}</p>
        <p>{error.format}</p>
      </div>
    </div>
  );
};

export default UpdatePopup;
