import { View, ViewStyle } from 'react-native';
import React from 'react';

interface SectionContainerProps {
  children: React.ReactNode;
  containerStyle?: ViewStyle;
}

/**
 *  This is for the codebase to be clean and make the component render faster and clean
 * @param param0
 * @returns
 * @example
 *  import {SectionContainer} from "./container";
 *   const App = () => {
 * return(
 * 
 * <SectionContainer>
   <Components />
 * </Sectioncontainer>
 * 
 * )
 * 
 * }
 * 
 */

const SectionContainer = ({
  children,
  containerStyle,
}: SectionContainerProps) => {
  return <View style={[containerStyle]}>{children}</View>;
};

export default SectionContainer;
