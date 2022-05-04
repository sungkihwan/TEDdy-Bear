//import styled from "styled-components";
import * as React from "react";
import { useState, useEffect } from "react";
import { LinkPreview } from "@dhaiwat10/react-link-preview";

import { LawnText } from "../styles/Style";
import * as Api from "../../../api";

function LawnCard({ talkInfo }) {
  const customFetcher = async (url) => {
    const response = await fetch(
      `https://rlp-proxy.herokuapp.com/v2?url=${url}`
    );
    const json = await response.json();

    json.metadata.title = talkInfo.title + " - ";
    for (let j = 0; j < talkInfo.speakers.length; j++) {
      json.metadata.title += talkInfo.speakers[j];
      if (talkInfo.speakers.length >= 2) {
        json.metadata.title += ", ";
      }
    }
    talkInfo["videoimg"] = json.metadata.image;

    json.metadata.description = "";
    return json.metadata;
  };

  return (
    <LinkPreview
      url={talkInfo.url}
      fetcher={customFetcher}
      width="300px"
      height="250px"
      fallback={<div>Fallback</div>}
    />
  );
}

export default LawnCard;
