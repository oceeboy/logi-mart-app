import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { THEME } from '../../constants/theme';
import SectionContainer from '../../components/wrapper/container';
import { Button, Text } from '../../components/shared';
import Toast from 'react-native-toast-message';

const OnBordingLayout = () => {
  const width = useSharedValue<number>(0);

  const reanimatedStyle = useAnimatedStyle(
    () => ({
      opacity: width.value,
    }),
    []
  );

  useEffect(() => {
    width.value = withTiming(1, { duration: 5000 });
  }, []);

  const onClick = () => {
    Toast.show({
      type: 'error',
      props: {
        title: 'Success',
        description: 'Product deleted successfully',
      },
    });
  };

  return (
    <SafeAreaView>
      <SectionContainer
        containerStyle={{
          marginHorizontal: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Animated.View
          style={[
            {
              width: 100,
              height: 100,
              borderRadius: 100 / 2,
              backgroundColor: THEME.colors.green,
            },
            reanimatedStyle,
          ]}
        />
        <Button
          title={'active'}
          onPress={onClick}
          containerStyle={{ height: 50, width: 200, marginTop: 10 }}
          current_state={'Active'}
        />
      </SectionContainer>
      <Text size={'h2'} weight={'bold'}>
        Testing the
      </Text>
      <Button
        title="click me"
        onPress={onClick}
        containerStyle={{ height: 50, marginHorizontal: 20 }}
        current_state={'Active'}
      />
    </SafeAreaView>
  );
};

export default OnBordingLayout;
