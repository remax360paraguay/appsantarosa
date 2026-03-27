import React from 'react';
import Svg, { Text, G, Path, Circle, Rect } from 'react-native-svg';

interface SRLogoProps {
  size?: number;
  color?: string;
}

export const SRLogo: React.FC<SRLogoProps> = ({ size = 40, color = '#FFFFFF' }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 40 40">
      {/* Outer circle */}
      <Circle cx="20" cy="20" r="19" fill="none" stroke={color} strokeWidth="1.5" />
      {/* SR text stylized */}
      <Text
        x="20"
        y="27"
        textAnchor="middle"
        fontSize="16"
        fontWeight="bold"
        fill={color}
        fontFamily="serif"
      >
        SR
      </Text>
    </Svg>
  );
};

interface BrandLogoProps {
  logoType: string;
  darkBackground: boolean;
  size?: number;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ logoType, darkBackground, size = 60 }) => {
  const color = darkBackground ? '#FFFFFF' : '#1B3A7A';
  const accentColor = darkBackground ? '#CCCCCC' : '#333333';

  switch (logoType) {
    case 'renault':
      return (
        <Svg width={size} height={size} viewBox="0 0 60 60">
          {/* Renault diamond */}
          <Path
            d="M30 5 L50 20 L30 35 L10 20 Z"
            fill="none"
            stroke={color}
            strokeWidth="3"
          />
          <Path
            d="M30 12 L44 22 L30 32 L16 22 Z"
            fill={color}
          />
          <Path
            d="M30 16 L40 22 L30 28 L20 22 Z"
            fill={darkBackground ? '#1A1A1A' : '#FFFFFF'}
          />
        </Svg>
      );

    case 'jetour':
      return (
        <Svg width={size * 2} height={size * 0.7} viewBox="0 0 120 42">
          <Text
            x="60"
            y="20"
            textAnchor="middle"
            fontSize="18"
            fontWeight="bold"
            fill={color}
            letterSpacing="3"
          >
            JETOUR
          </Text>
          <Text
            x="60"
            y="36"
            textAnchor="middle"
            fontSize="9"
            fill={accentColor}
            letterSpacing="1"
          >
            Drive Your Future
          </Text>
        </Svg>
      );

    case 'gwm':
      return (
        <Svg width={size} height={size} viewBox="0 0 60 60">
          <Circle cx="30" cy="28" r="22" fill="none" stroke={color} strokeWidth="2.5" />
          <Text
            x="30"
            y="34"
            textAnchor="middle"
            fontSize="14"
            fontWeight="bold"
            fill={color}
            letterSpacing="1"
          >
            GWM
          </Text>
        </Svg>
      );

    case 'se_paraguay':
      return (
        <Svg width={size} height={size} viewBox="0 0 60 60">
          <Circle cx="30" cy="26" r="20" fill="#FF6B00" />
          <Text
            x="30"
            y="24"
            textAnchor="middle"
            fontSize="11"
            fontWeight="bold"
            fill="#FFFFFF"
            letterSpacing="0.5"
          >
            SE≡
          </Text>
          <Text
            x="30"
            y="37"
            textAnchor="middle"
            fontSize="8"
            fill="#FFFFFF"
            letterSpacing="0.5"
          >
            Paraguay
          </Text>
        </Svg>
      );

    case 'jac':
      return (
        <Svg width={size} height={size * 0.6} viewBox="0 0 60 36">
          <Text
            x="30"
            y="28"
            textAnchor="middle"
            fontSize="26"
            fontWeight="bold"
            fill={color}
            fontStyle="italic"
            letterSpacing="2"
          >
            JAC
          </Text>
        </Svg>
      );

    case 'leapmotor':
      return (
        <Svg width={size * 1.8} height={size * 0.7} viewBox="0 0 108 42">
          {/* Circular arrow icon */}
          <Path
            d="M12 21 A10 10 0 1 1 22 11"
            fill="none"
            stroke={color}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <Path d="M22 6 L22 13 L15 10 Z" fill={color} />
          <Text
            x="64"
            y="27"
            textAnchor="middle"
            fontSize="15"
            fontWeight="bold"
            fill={color}
            letterSpacing="1.5"
          >
            LEAPMOTOR
          </Text>
        </Svg>
      );

    case 'dfsk':
      return (
        <Svg width={size} height={size * 0.8} viewBox="0 0 60 48">
          {/* Diagonal lines pattern */}
          <Rect x="8" y="8" width="44" height="32" rx="3" fill="none" stroke={color} strokeWidth="2" />
          <Path d="M8 32 L36 8" stroke={color} strokeWidth="2" />
          <Path d="M20 40 L52 8" stroke={color} strokeWidth="2" />
          <Text
            x="30"
            y="28"
            textAnchor="middle"
            fontSize="12"
            fontWeight="bold"
            fill={color}
            letterSpacing="1"
          >
            DFSK
          </Text>
        </Svg>
      );

    case 'byd':
      return (
        <Svg width={size} height={size * 0.7} viewBox="0 0 60 42">
          <Text
            x="30"
            y="20"
            textAnchor="middle"
            fontSize="18"
            fontWeight="bold"
            fill={color}
            letterSpacing="2"
          >
            BYD
          </Text>
          <Text
            x="30"
            y="34"
            textAnchor="middle"
            fontSize="9"
            fill={color}
            letterSpacing="0.5"
          >
            Build Your Dreams
          </Text>
        </Svg>
      );
    case 'chery':
      return (
        <Svg width={size} height={size * 0.7} viewBox="0 0 60 42">
          <Text
            x="30"
            y="28"
            textAnchor="middle"
            fontSize="16"
            fontWeight="bold"
            fill={color}
            letterSpacing="2"
          >
            CHERY
          </Text>
        </Svg>
      );

    default:
      return (
        <Svg width={size} height={size * 0.7} viewBox="0 0 60 42">
          <Text
            x="30"
            y="28"
            textAnchor="middle"
            fontSize="14"
            fontWeight="bold"
            fill={color}
          >
            {logoType.toUpperCase()}
          </Text>
        </Svg>
      );
  }
};
