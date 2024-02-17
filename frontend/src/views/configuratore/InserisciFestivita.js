import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBContainer,
  MDBRow
} from "mdb-react-ui-kit";
import React, {useEffect, useState} from "react";
import {toast, ToastContainer} from "react-toastify";
import InserisciFestivitaForm from "../../components/common/InserisciFestivitaForm";
import { t } from "i18next";
import FestivitaInseriteList from "../../components/common/FestivitaInseriteList";
import {HolidaysAPI} from "../../API/HolidaysAPI";

export default function InserisciFestivita() {

  let [normalHolidays, setNormalHolidays] = useState([])
  let [recurrentHolidays, setRecurrentHolidays] = useState([])

  useEffect(() => {

    const asyncFetch = async () => {

      let response, content
      try {
        [response, content] = await new HolidaysAPI().getCustomHolidays()
      } catch (err) {

        toast(t('Connection Error, please try again later'), {
          position: 'top-center',
          autoClose: 1500,
          style : {background : "red", color : "white"}
        })
        return
      }
      if (response !== 200) {
        window.location.reload()
      }

      setNormalHolidays(content.normalHolidays)
      setRecurrentHolidays(content.recurrentHolidays)
    }

    asyncFetch().then(() => {})

  }, []);


  return (
    <section style={{backgroundColor: '#eee'}}>
      <MDBContainer className="py-5" style={{height: '85vh',}}>
        <MDBCard alignment='center'>
          <MDBCardBody>
            <MDBCardTitle>{t("Manage custom holidays")}</MDBCardTitle>
            <MDBRow>
              <InserisciFestivitaForm normalHolidays={normalHolidays} setNormalHolidays={setNormalHolidays}
                                      recurrentHolidays={recurrentHolidays} setRecurrentHolidays={setRecurrentHolidays}/>
            </MDBRow>
            <MDBRow>
              <FestivitaInseriteList normalHolidays={normalHolidays} setNormalHolidays={setNormalHolidays}
                                     recurrentHolidays={recurrentHolidays} setRecurrentHolidays={setRecurrentHolidays}/>
            </MDBRow>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
      <ToastContainer/>
    </section>
  )
}
