"use client";
import React, { useState, useRef, useEffect } from "react";
import { GiScales } from "react-icons/gi";  // 事件1
import { FaExclamationCircle, FaUnlockAlt,FaChevronDown, FaShieldVirus, FaBan } from "react-icons/fa";  // 事件2, 3, 4, 5

const Timeline = () => {
  const [expandedEvent, setExpandedEvent] = useState(null);
  const [showAllEvents, setShowAllEvents] = useState(false); // 控制是否顯示所有事件
  const [language, setLanguage] = useState("en"); // 新增語言選擇，預設為英文
  const timelineRef = useRef(null);

  const timelineEvents = [
    {
      id: 1,
      title: {
        en: "BitMEX Charged with Violating Anti-Money Laundering Laws",
        zh: "BitMEX 因違反反洗錢法而被起訴"
      },
      date: "2020-10-01",
      organization: {
        en: "BitMEX",
        zh: "BitMEX"
      },
      fine: "$100 million",
      description: {
        en: "The U.S. Commodity Futures Trading Commission (CFTC) and the Financial Crimes Enforcement Network (FinCEN) charged BitMEX for failure to implement required AML safeguards.",
        zh: "美國商品期貨交易委員會（CFTC）和金融犯罪執法網絡（FinCEN）因 BitMEX 未能實施所需的反洗錢措施而對其提出指控。"
      },
      detailedContent: {
        en: "BitMEX, one of the largest cryptocurrency derivatives exchanges, faced charges of failing to establish and maintain an anti-money laundering program, and failing to report suspicious activity. BitMEX founders were also indicted for violations of the Bank Secrecy Act. The platform agreed to pay a $100 million fine to settle the charges.",
        zh: "作為全球最大的加密貨幣衍生品交易所之一，BitMEX 因未能建立和維護反洗錢計劃以及未能報告可疑活動而受到指控。BitMEX 的創始人也因違反《銀行保密法》而被起訴。該平台同意支付 1 億美元罰款以解決指控。"
      },
      icon: <GiScales />,
      isMilestone: true
    },
    {
      id: 2,
      title: {
        en: "Bitfinex and Tether Fined for False Statements",
        zh: "Bitfinex 和 Tether 因虛假陳述而被罰款"
      },
      date: "2021-10-15",
      organization: {
        en: "Bitfinex & Tether",
        zh: "Bitfinex 和 Tether"
      },
      fine: "$42.5 million",
      description: {
        en: "The CFTC fined Bitfinex and Tether for making false or misleading statements regarding their backing of Tether (USDT) and involvement in illegal commodity transactions.",
        zh: "CFTC 因 Bitfinex 和 Tether 對其 USDT 支持以及非法商品交易的虛假或誤導性陳述而對其罰款。"
      },
      detailedContent: {
        en: "Tether claimed its USDT stablecoin was fully backed by U.S. dollars, but investigations revealed that Tether had not been fully backed for long periods. Bitfinex was also implicated for illegal commodity transactions. The companies paid a combined fine of $42.5 million to settle the charges.",
        zh: "Tether 聲稱其 USDT 穩定幣完全由美元支持，但調查顯示 Tether 長期未完全支持其穩定幣。Bitfinex 也因非法商品交易而被牽連。這些公司支付了 4250 萬美元的罰款以解決指控。"
      },
      icon: <FaExclamationCircle />,
      isMilestone: false
    },
    {
      id: 3,
      title: {
        en: "Colonial Pipeline Hack Ransom Seizure",
        zh: "Colonial Pipeline 黑客勒索贖金被沒收"
      },
      date: "2021-06-07",
      organization: {
        en: "Colonial Pipeline",
        zh: "Colonial Pipeline"
      },
      fine: "$2.3 million (ransom recovered)",
      description: {
        en: "The U.S. Department of Justice seized $2.3 million in cryptocurrency ransom paid to hackers following the Colonial Pipeline ransomware attack.",
        zh: "美國司法部在 Colonial Pipeline 勒索軟件攻擊事件後，沒收了支付給黑客的 230 萬美元加密貨幣贖金。"
      },
      detailedContent: {
        en: "In a landmark case, the FBI managed to recover part of the ransom paid to the hackers behind the Colonial Pipeline attack. The ransomware group, known as DarkSide, had demanded the ransom in Bitcoin. The case underscored the rising role of cryptocurrencies in criminal activities, including money laundering.",
        zh: "在這起具有里程碑意義的案件中，FBI 成功追回了支付給發起 Colonial Pipeline 攻擊的黑客的部分贖金。勒索軟件團體 DarkSide 要求以比特幣支付贖金。此案件凸顯了加密貨幣在洗錢等犯罪活動中的日益重要作用。"
      },
      icon: <FaUnlockAlt />
    },
    {
      id: 4,
      title: {
        en: "Robinhood Fined for AML and Cybersecurity Failures",
        zh: "Robinhood 因反洗錢和網絡安全失敗被罰款"
      },
      date: "2022-08-02",
      organization: {
        en: "Robinhood",
        zh: "Robinhood"
      },
      fine: "$30 million",
      description: {
        en: "New York's Department of Financial Services fined Robinhood for significant anti-money laundering and cybersecurity failures.",
        zh: "紐約金融服務局因 Robinhood 在反洗錢和網絡安全方面的重大失敗而對其處以 3000 萬美元罰款。"
      },
      detailedContent: {
        en: "Robinhood's crypto arm was fined $30 million for failing to maintain proper anti-money laundering procedures and cybersecurity protocols. The investigation revealed systemic issues, including insufficient resources dedicated to compliance.",
        zh: "Robinhood 的加密部門因未能維護適當的反洗錢程序和網絡安全協議而被處以 3000 萬美元罰款。調查顯示，該公司存在系統性問題，包括在合規方面投入的資源不足。"
      },
      icon: <FaShieldVirus />,
      isMilestone: false
    },
    {
      id: 5,
      title: {
        en: "Kraken Fined for Violating U.S. Sanctions",
        zh: "Kraken 因違反美國制裁規定被罰款"
      },
      date: "2022-11-28",
      organization: {
        en: "Kraken",
        zh: "Kraken"
      },
      fine: "$362,158",
      description: {
        en: "Kraken was fined for allowing users from sanctioned countries, including Iran, to conduct cryptocurrency transactions.",
        zh: "Kraken 因允許來自受制裁國家（包括伊朗）的用戶進行加密貨幣交易而被罰款。"
      },
      detailedContent: {
        en: "Kraken agreed to pay $362,158 to settle allegations that it had violated U.S. sanctions by allowing users in Iran to trade cryptocurrencies. The case emphasized the growing scrutiny of cryptocurrency exchanges regarding compliance with international sanctions.",
        zh: "Kraken 同意支付 362,158 美元以解決因允許伊朗用戶進行加密貨幣交易而違反美國制裁的指控。該案件強調了對加密貨幣交易所在遵守國際制裁方面的日益關注。"
      },
      icon: <FaBan />
    }
  ];

  const handleEventClick = (eventId) => {
    setExpandedEvent(expandedEvent === eventId ? null : eventId);
  };

  const handleSmoothScroll = () => {
    setShowAllEvents(true); // 點擊按鈕時顯示所有事件
    const element = document.getElementById(`event-${timelineEvents[0].id}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  // 反轉排序時間，從最新的事件開始
  const eventsToShow = showAllEvents ? [...timelineEvents].reverse() : [...timelineEvents].slice(0, 6).reverse();

  return (
    <div className="container mx-auto my-8 px-4">
      <div className="text-right mb-4">
        <button
          onClick={() => setLanguage(language === "en" ? "zh" : "en")}
          className="bg-gray-200 px-4 py-2 rounded"
        >
          {language === "en" ? "切換到中文" : "Switch to English"}
        </button>
      </div>

      <h1 className="text-3xl font-bold mb-8 text-center">
        {language === "en" ? "Cryptocurrency Violation Archives" : "加密貨幣違規檔案"}
      </h1>

      <div ref={timelineRef} className="relative">
        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gray-300 h-full z-0"></div> {/* 中間的垂直線 */}
        {eventsToShow.map((event, index) => (
          <div
            key={event.id}
            id={`event-${event.id}`}
            className={`flex items-center mb-8 relative ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
            tabIndex={0}
            aria-label={`${event.title[language]} on ${event.date}`}
          >
            <div className={`w-1/2 ${index % 2 === 0 ? "pr-8" : "pl-8"}`}>
              <div
                className={`p-4 rounded-lg shadow-md transition-all duration-300 ${
                  expandedEvent === event.id ? "bg-blue-100" : "bg-white"
                } hover:shadow-lg cursor-pointer`}
                onClick={() => handleEventClick(event.id)}
                onKeyPress={(e) => e.key === "Enter" && handleEventClick(event.id)}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-semibold">{event.title[language]}</h3>
                  <span className={`text-2xl ${event.isMilestone ? "text-yellow-500" : "text-gray-500"}`}>
                    {event.icon}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{event.date}</p>
                <p className="text-sm text-gray-600 mb-2">{language === "en" ? "Fine" : "罰款"}: {event.fine}</p>
                <p className="text-sm text-gray-600 mb-2">
                  {language === "en" ? "Organization" : "組織"}: {event.organization[language]}
                </p>
                {expandedEvent === event.id && (
                  <p className="text-gray-700 mt-2">{event.detailedContent[language]}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {!showAllEvents && ( // 如果還沒顯示所有事件，顯示 "Scroll to End" 按鈕
        <div className="text-center mt-8">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300"
            onClick={handleSmoothScroll}
          >
            <FaChevronDown className="inline mr-2" />
            {language === "en" ? "Scroll to End" : "滾動到最後"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Timeline;
