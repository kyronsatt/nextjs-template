"use client";

import React, { ReactNode, useEffect, useRef } from "react";
import {
  HTMLMotionProps,
  motion,
  useAnimation,
  useInView,
} from "framer-motion";

type IPosition = "BOTTOM" | "TOP" | "LEFT" | "RIGHT";
export interface IReveal extends HTMLMotionProps<"div"> {
  children?: ReactNode;
  tagName?: keyof HTMLElementTagNameMap;
  delay?: number;
  duration?: number;
  moveFrom?: IPosition;
}
export function Reveal({
  children,
  moveFrom,
  tagName = "div",
  delay = 0.25,
  duration = 0.4,
  ...restAttrs
}: IReveal) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const animationControl = useAnimation();
  useEffect(() => {
    if (isInView) {
      animationControl.start("visible");
    }
  }, [isInView]);

  // @ts-expect-error :: dynamic tag name
  const MotionComponentWrapper = motion[tagName];

  const moveFromCoordinatesIndexer: Record<
    IPosition,
    { x: number; y: number }
  > = {
    BOTTOM: {
      x: 0,
      y: 40,
    },
    TOP: {
      x: 0,
      y: -40,
    },
    LEFT: {
      x: -40,
      y: 0,
    },
    RIGHT: {
      x: 40,
      y: 0,
    },
  };

  const moveFromCoordinates = moveFrom
    ? moveFromCoordinatesIndexer[moveFrom]
    : {};

  return (
    <MotionComponentWrapper
      ref={ref}
      variants={{
        hidden: { opacity: 0, ...moveFromCoordinates },
        visible: { opacity: 1, y: 0, x: 0 },
      }}
      initial="hidden"
      animate={animationControl}
      transition={{ duration, delay }}
      exit={{ opacity: 0 }}
      {...restAttrs}
    >
      {children}
    </MotionComponentWrapper>
  );
}
