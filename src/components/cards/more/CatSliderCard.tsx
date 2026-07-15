"use client";
import type React from "react";
import { useState } from "react";

interface OptionData {
  id: number;
  background: string;
  icon: string;
  main: string;
  sub: string;
  defaultColor: string;
}

const OPTIONS: OptionData[] = [
  { id: 0, background: "/premium/tabby-cat.png",   icon: "fas fa-glasses",     main: "cool cat",       sub: "living the sunglasses life", defaultColor: "#ED5565" },
  { id: 1, background: "/premium/cat-hat.png",     icon: "fas fa-sun",         main: "poolside vibes", sub: "summer hat game strong",    defaultColor: "#FC6E51" },
  { id: 2, background: "/premium/cat-box.png",     icon: "fas fa-box",         main: "box explorer",   sub: "if i fits, i sits",          defaultColor: "#FFCE54" },
  { id: 3, background: "/premium/cracker-cat.png", icon: "fas fa-cookie-bite", main: "snack time",     sub: "nom nom nom",                defaultColor: "#2ECC71" },
  { id: 4, background: "/premium/galaxy-cat.png",  icon: "fas fa-star",        main: "cosmic kitty",   sub: "exploring the universe",     defaultColor: "#5D9CEC" },
];

const STYLES = `
  .cat-options-container { display:flex; flex-direction:row; justify-content:center; align-items:center; overflow:hidden; min-height:100vh; font-family:'Roboto',sans-serif; transition:0.25s; background:#f5f5f5; }
  .cat-options-wrapper { display:flex; flex-direction:row; align-items:stretch; overflow:hidden; min-width:600px; max-width:900px; width:calc(100% - 100px); height:400px; }
  .cat-option-item { position:relative; overflow:hidden; min-width:60px; margin:10px; background-size:auto 120%; background-position:center; cursor:pointer; transition:0.5s cubic-bezier(0.05,0.61,0.41,0.95); border-radius:30px; flex-grow:1; }
  .cat-option-item.active { flex-grow:10000; transform:scale(1); max-width:600px; margin:0; border-radius:40px; background-size:auto 100%; }
  .cat-option-item.active .option-shadow { box-shadow:none; }
  .cat-option-item:not(.active) .option-shadow { bottom:-40px; box-shadow:none; }
  .cat-option-item.active .option-label { bottom:20px; left:20px; }
  .cat-option-item:not(.active) .option-label { bottom:10px; left:10px; }
  .cat-option-item.active .option-info > div { left:0; opacity:1; }
  .cat-option-item:not(.active) .option-info > div { left:20px; opacity:0; }
  .option-shadow { position:absolute; bottom:0; left:0; right:0; height:120px; transition:0.5s cubic-bezier(0.05,0.61,0.41,0.95); }
  .option-label { display:flex; position:absolute; right:0; height:40px; transition:0.5s cubic-bezier(0.05,0.61,0.41,0.95); }
  .option-icon { display:flex; flex-direction:row; justify-content:center; align-items:center; min-width:40px; max-width:40px; height:40px; border-radius:100%; background-color:white; }
  .option-info { display:flex; flex-direction:column; justify-content:center; margin-left:10px; color:white; white-space:pre; }
  .option-info > div { position:relative; transition:0.5s cubic-bezier(0.05,0.61,0.41,0.95), opacity 0.5s ease-out; }
  .option-main { font-weight:bold; font-size:1.2rem; }
  .option-sub { transition-delay:0.1s; }
  .cat-inactive-options { display:none; }
  @media screen and (max-width: 1024px) {
    .cat-options-container { padding:20px; height:auto; min-height:100vh; flex-direction:column; }
    .cat-options-wrapper { display:flex; flex-direction:column; min-width:auto; max-width:none; width:100%; height:auto; align-items:center; }
    .cat-option-item.active { display:block; width:100%; max-width:500px; height:300px; margin:0 0 30px 0; border-radius:25px; background-size:cover; flex-grow:0; transform:none; }
    .cat-option-item.active .option-label { bottom:25px; left:25px; right:auto; height:40px; }
    .cat-option-item.active .option-info > div { left:0; opacity:1; }
    .cat-option-item:not(.active) { display:none; }
    .cat-inactive-options { display:flex; justify-content:center; flex-wrap:wrap; gap:15px; width:100%; max-width:500px; }
    .cat-inactive-option { width:70px; height:70px; border-radius:50%; background-size:cover; background-position:center; position:relative; cursor:pointer; transition:transform 0.3s ease; overflow:hidden; }
    .cat-inactive-option::before { content:''; position:absolute; top:0; left:0; right:0; bottom:0; background:rgba(0,0,0,0.3); border-radius:50%; }
    .cat-inactive-option-inner { position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); background:white; width:40px; height:40px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:18px; z-index:1; }
  }
  @media screen and (max-width: 768px) {
    .cat-option-item.active { height:250px; border-radius:20px; max-width:400px; }
    .cat-option-item.active .option-label { bottom:20px; left:20px; }
    .cat-inactive-option { width:60px; height:60px; }
    .cat-inactive-option-inner { width:35px; height:35px; font-size:16px; }
  }
  @media screen and (max-width: 480px) {
    .cat-option-item.active { height:220px; border-radius:18px; }
    .cat-option-item.active .option-label { bottom:18px; left:18px; }
    .option-main { font-size:1.1rem; }
    .cat-inactive-option { width:50px; height:50px; }
    .cat-inactive-option-inner { width:30px; height:30px; font-size:14px; }
  }
`;

export function CatSliderCard() {
  const [active, setActive] = useState(0);
  return (
    <>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet" />
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      <div className="cat-options-container">
        <div className="cat-options-wrapper">
          {OPTIONS.map((opt) => (
            <div
              key={opt.id}
              className={`cat-option-item ${active === opt.id ? "active" : ""}`}
              style={{
                backgroundImage: `url(${opt.background})`,
                backgroundSize: opt.id === 1 || opt.id === 2 || opt.id === 4 ? "cover" : undefined,
                ["--defaultBackground" as string]: opt.defaultColor,
              } as React.CSSProperties}
              onClick={() => setActive(opt.id)}
            >
              <div className="option-shadow" />
              <div className="option-label">
                <div
                  className="option-icon"
                  style={{
                    color: "#C0C0C0",
                    textShadow: "0 1px 2px rgba(0,0,0,0.3), 0 0 8px rgba(255,255,255,0.5)",
                    filter: "drop-shadow(0 0 2px rgba(255,255,255,0.8))",
                  }}
                >
                  <i className={opt.icon} />
                </div>
                <div className="option-info">
                  <div className="option-main font-mono">{opt.main}</div>
                  <div className="option-sub font-mono">{opt.sub}</div>
                </div>
              </div>
            </div>
          ))}
          <div className="cat-inactive-options">
            {OPTIONS.map((opt) => opt.id !== active && (
              <div
                key={opt.id}
                className="cat-inactive-option"
                style={{ backgroundImage: `url(${opt.background})` }}
                onClick={() => setActive(opt.id)}
              >
                <div className="cat-inactive-option-inner">
                  <i className={opt.icon} style={{ color: opt.defaultColor }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
