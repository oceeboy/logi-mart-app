import React from 'react';
import { Tabs } from 'expo-router';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { THEME } from '../../constants/theme';

import { Text } from '../../components/shared';
import { View } from 'react-native';
import { Box, Home, Settings } from 'react-native-feather';
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';

// Define props for AnimatedIcon component
interface AnimatedIconProps {
  IconComponent: React.ComponentType<{
    width: number;
    height: number;
    color: string;
  }>;
  color: string;
  focused: boolean;
  name: string;
}

// AnimatedIcon component with animation based on focus state
const AnimatedIcon = ({
  IconComponent,
  color,
  focused,
  name,
}: AnimatedIconProps) => {
  const scale = useSharedValue(focused ? 1.2 : 1);
  const animationStyle = useAnimatedStyle(
    () => ({
      transform: [{ scale: withTiming(scale.value, { duration: 200 }) }],
    }),
    [focused]
  );

  return (
    <Animated.View
      style={[
        animationStyle,
        { justifyContent: 'center', alignItems: 'center' },
      ]}
    >
      <IconComponent width={20} height={20} color={color} />
      <View>
        <Text size="body3" style={{ textTransform: 'capitalize' }}>
          {name}
        </Text>
      </View>
    </Animated.View>
  );
};

// TabsLayout component with navigation and icons
const TabsLayout = () => {
  const screenOptions = ({
    route,
  }: {
    route: { name: string };
  }): BottomTabNavigationOptions => ({
    headerShown: false,
    tabBarActiveTintColor: THEME.colors.primary,
    tabBarInactiveTintColor: '#545454',
    tabBarShowLabel: false,
    tabBarStyle: {
      backgroundColor: THEME.colors.white,
      height: 80,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      bottom: 10,
      right: 0,
      left: 0,
      elevation: 0,
      zIndex: 1,
    },
    tabBarIcon: ({ color, focused }: { color: string; focused: boolean }) => {
      let IconComponent;

      switch (route.name) {
        case 'home':
          IconComponent = Home;
          break;
        case 'product':
          IconComponent = Box;
          break;
        case 'settings':
          IconComponent = Settings;
          break;
        default:
          IconComponent = Home;
      }

      return (
        <AnimatedIcon
          IconComponent={IconComponent}
          color={color}
          focused={focused}
          name={route.name}
        />
      );
    },
  });

  return (
    <Tabs screenOptions={screenOptions}>
      <Tabs.Screen name="home" key="home" />
      <Tabs.Screen name="product" key="product" />
      <Tabs.Screen name="settings" key="settings" />
    </Tabs>
  );
};

export default TabsLayout;
