import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex: 1;
  width: 100vw;
  min-height: 100vh;
  overflow: hidden;
  justify-content: space-between;

  @media (max-width: 767px) {
    display: block;
    flex: 0;
    flex: 0;
    width: auto;
  }
`

export const Column = styled.div`
  width: 30%;
  padding: 16px;

  @media (max-width: 767px) {
    width: auto;
    min-width: 350px;
  }
`
