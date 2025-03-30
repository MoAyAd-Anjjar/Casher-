import React, { useEffect, useState } from "react";
import { FaCashRegister } from "react-icons/fa";
import { FcDebt, FcSettings } from "react-icons/fc";
import { PiNotePencilBold } from "react-icons/pi";
import { RiUserAddFill } from "react-icons/ri";
import "./Main.css";
function  Main({ Page }: any) {
  return (
    <div className="w-auto">
      <h1 className="relative top-[-125px]">لوحة التحكم</h1>
      <div className="flex  gap-[1vh] items-end justify-center">
        <span onClick={() => Page(1)}>
          <FaCashRegister color="#ff8989" size={130}></FaCashRegister>
          <label htmlFor="">كشير</label>
        </span>

        <span onClick={() => Page(2)}>
          <PiNotePencilBold size={120}></PiNotePencilBold>
          <label htmlFor="">اضافة مننج جديد</label>
        </span>

        <span onClick={() => Page(3)}>
          <FcDebt color="#ff8989" size={130}></FcDebt>
          <label htmlFor="">الدين</label>
        </span>

        <span onClick={() => Page(4)}>
          <FcSettings color="#ff8989" size={130}></FcSettings>
          <label htmlFor="">تعديل و حذف منتج</label>
        </span>

        <span onClick={() => Page(5)}>
          <RiUserAddFill color="rgb(91 184 151)" size={130}></RiUserAddFill>
          <label htmlFor="">اضافة عميل جديد</label>
        </span>
      </div>
    </div>
  );
}

export default Main;
