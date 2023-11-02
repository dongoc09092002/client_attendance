import "./Boxuser.css";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import { URL } from "../../link_server";
const moment = require("moment");
const now = moment();
const formattedDate = now.format("DD/MM/YYYY");
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};


function Boxuser(prop) {
  const [dataAttent , setDataAttent] = useState({})
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [rf,setRf] = useState(true)
  function openModal() {
    // handleViewUser();
    setIsOpen(true);
    setRf(!rf)
    console.log("hehe",dataAttent);
  }

  function closeModal() {
    setIsOpen(false);
  }



  useEffect(() => {
    axios
      .post(
        `${URL}/attendance/get`,
        { UserId: prop.infor.id },
        {
          withCredentials: true,
        }
      )
      .then(function (response) {
        console.log(response);
        if (response.data.errCode === 0) {
          setDataAttent({...response.data });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rf]);
  return (
    <>
      <div
        className="user_item"
        style={{
          width: prop.check ? "45%" : "100%",
        }}
      >
        {!prop.check && (
          <>
            <i
              style={{
                padding: "0px 10px",
                color: dataAttent.length > 0 ? "#145e94" : "#333",
              }}
              class="fa-solid fa-circle-check"
            ></i>
          </>
        )}

        <img
          style={{ marginLeft: prop.check ? "20px" : "0px" }}
          alt=""
          src={prop.infor.userImage}
        />
        <div className="user_content">
          <div className="user_name">{prop.infor.userName}</div>
          <div className="user_code">{prop.infor.userCode}</div>
        </div>
        {!prop.check && (
          <>
            <i
              onClick={openModal}
              class="fa-solid fa-ellipsis-vertical"
              style={{ cursor: "pointer", padding: "0px 5px" }}
            ></i>
          </>
        )}
      </div>
      {!prop.check && (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          {dataAttent && !prop.check && (
            <>
              <div className="modal_user">
                <div className="modal_user_date">
                  <i
                    class="fa-regular fa-calendar-days"
                    style={{ padding: "0px 5px" }}
                  ></i>
                  {formattedDate}
                  <i
                    class="fa-solid fa-xmark icon_close_modal"
                    onClick={closeModal}
                  ></i>
                </div>
                <div className="modal_user_infor">
                  <div className="modal_user_infor_img">
                    <img alt="" src={dataAttent.img} />
                  </div>
                  <div className="modal_user_infor_content">
                    <span>Name : {dataAttent.name}</span>
                    <br />
                    <span>Code : {dataAttent.code}</span> <br />
                    {dataAttent.length > 0 ? (
                      <>
                        <span>
                          Attendace : <i class="fa-solid fa-check"></i>
                        </span>
                      </>
                    ) : (
                      <>
                        {" "}
                        <span>
                          Attendace : <i class="fa-solid fa-xmark"></i>
                        </span>
                      </>
                    )}
                    {/* <div className="modal_user_infor_content_btn">
                      <i class="fa-solid fa-pen-to-square"></i>
                      <i class="fa-solid fa-trash"></i>
                    </div> */}
                  </div>
                </div>
                <div className="modal_user_footer">
                  Attendance : {dataAttent.length}
                </div>
              </div>
            </>
          )}
        </Modal>
      )}
    </>
  );
}

export default Boxuser;
