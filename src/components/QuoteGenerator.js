import { useState, useEffect, useRef } from "react";
import {
  BiSolidChevronRightCircle,
  BiSolidQuoteAltLeft,
  BiSolidQuoteAltRight,
  BiStopCircle,
  BiSolidPlusCircle
} from "react-icons/bi";
import { Tooltip } from "react-tooltip";
import styled from "styled-components";

const QuoteContainer = styled.div`
  height: auto;
  margin: 20px 0;
  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const Quote = styled.div`
  width: 800px;
  display: flex;
  height: auto;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  text-align: left;
  @media (max-width: 768px) {
    align-items: center;
    text-align: center;
    width: auto;
    margin: 0 40px;
  }
`;

const Title = styled.h1`
  color: ${(props) => props.theme.titleColor};
  font-size: 3.5em;
  padding: 0;
  margin: 0;
`;

const Text = styled.p`
margin: 0;
  color: ${(props) => props.theme.tagLineColor};
  font-style: italic;
  font-size: 1.5em;
  font-weight: 200;
  @media (max-width: 768px) {
    font-size: 1.2em;
  }
`;

const YellowText = styled.p`
margin: 0;
display:inline;
float:right;
padding-left: 10px;
  color: ${(props) => props.theme.titleColor};
`;

const Author = styled.p`
  color: ${(props) => props.theme.titleColor};
  text-align: right;
  font-weight: 400;
  margin-top: 0.5em;
  font-size: 1.2em;
  @media (max-width: 768px) {
    font-size: 1em;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 20px;
  margin-top: 1em;
`;

const ButtonNewQuote = styled.div`
  color: ${(props) => props.theme.titleColor};
  text-decoration: none;
  font-size: 24px;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
`;

const ButtonAutoQuote = styled.div`
  color: ${(props) => props.theme.titleColor};
  text-decoration: none;
  font-size: 24px;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
`;

const TooltipStyle = styled.div`
  font-size: 0.6em;
`;

const QuoteGenerator = () => {
  const [quoteData, setQuoteData] = useState({});
  const [isAutoQuoteEnabled, setIsAutoQuoteEnabled] = useState(false);
  const interval = useRef(null);

  const yellow = (props) => props.theme.titleColor;

  const fetchNewQuote = async () => {
    const response = await fetch("https://api.quotable.io/random");
    const data = await response.json();
    console.log(data);
    setQuoteData({
      text: data.content,
      author: data.author,
    });
  };

  useEffect(() => {
    if (isAutoQuoteEnabled) {
      interval.current = setInterval(() => {
        fetchNewQuote();
      }, 20000);
    } else {
      clearInterval(interval.current);
    }
    fetchNewQuote();
  }, [isAutoQuoteEnabled]);

  return (
    <QuoteContainer>
      <Quote>
        <Title><BiSolidQuoteAltLeft /></Title>
        <Text>{quoteData.text} <YellowText><BiSolidQuoteAltRight color={{yellow}} size="20px" /></YellowText></Text>
        
        <Author>- {quoteData.author || "Unknown"}</Author>
        <ButtonGroup>
          <ButtonNewQuote onClick={fetchNewQuote}>
            <BiSolidPlusCircle
              data-tooltip-id="newquote"
              data-tooltip-content="New Quote"
              data-tooltip-place="top"
            />
            <TooltipStyle>
              <Tooltip id="newquote" />
            </TooltipStyle>
          </ButtonNewQuote>

          {isAutoQuoteEnabled ? (
            <ButtonAutoQuote
              onClick={() => setIsAutoQuoteEnabled(!isAutoQuoteEnabled)}
            >
              <BiStopCircle
                data-tooltip-id="stop"
                data-tooltip-content="Stop Auto Quote"
                data-tooltip-place="top"
              />
              <TooltipStyle>
                <Tooltip id="stop" />
              </TooltipStyle>
            </ButtonAutoQuote>
          ) : (
            <ButtonAutoQuote
              onClick={() => setIsAutoQuoteEnabled(!isAutoQuoteEnabled)}
            >
              <BiSolidChevronRightCircle
                data-tooltip-id="start"
                data-tooltip-content="Start Auto Quote"
                data-tooltip-place="top"
              />
              <TooltipStyle>
                <Tooltip id="start" />
              </TooltipStyle>
            </ButtonAutoQuote>
          )}
        </ButtonGroup>
      </Quote>
    </QuoteContainer>
  );
};

export default QuoteGenerator;
