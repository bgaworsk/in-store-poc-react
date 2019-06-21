import React,{ useState }  from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';
import logo from './logo.svg';

const Loader = styled(animated.div)`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: #000;
  color: #fff;
  width: 100%;
  height: 100%;
  will-change: top;
`;

const Container = styled.div`
  justify-content: center;
`;

const Logo = styled(animated.img)`
  width: 100%;
  height: 100%;
  opacity: 0;
  will-change: width, height, opacity;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  margin: 24px auto;
`;

const LoadingIndicator = styled(animated.div)`
  width: 100%;
  height: 5px;
  background-color: white;
  border-radius: 50px;
  transform-origin: 0 0;
  transform: scaleX(0);
  will-change: transform;
`;

export default ({ loadComplete }) => {

  // Use state to manage when load is completed
  const [isLoaded, setIsLoaded] = useState(false);

  // Grow logo in size
  const logoProps = useSpring({
    from: {opacity: 0, width: '0%', height: '0%'},
    to: {opacity: 1, width: '100%', height: '100%'},
  });

  // Animate progress bar, when completed, set loaded to true
  const loadingProps = useSpring({
    from: {transform: 'scaleX(0)'}, to: {transform: 'scaleX(1)'},
    onRest: () => setIsLoaded(true)
  });

  // Once loaded, the whole loader screen moves up, when completed the load completed is called back
  const loaderProps = useSpring({
    from: {top: '0%'}, to: { top: isLoaded ? '-100%' : '0%'},
    onRest: loadComplete
  });

  return (
    <Loader style={loaderProps}>
      <Container>
        <LogoContainer>
          <Logo src={logo} alt="CoreMedia Logo" style={logoProps}/>
        </LogoContainer>
        <LoadingIndicator style={loadingProps}/>
      </Container>
    </Loader>
  );
}