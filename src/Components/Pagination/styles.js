import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 300px;
`
export const Button = styled.button`
  margin: 8px 16px;
  font-size: 14px;
  cursor: pointer;
  border: 0;
  background: black;
  color: white;
  transition: background 0.25s ease;
  &[disabled] {
    background: gray;
    pointer-events: none;
  }
  &:hover {
    background: blue;
    color: white;
  }
`

export const CurPage = styled.div`
  font-size: 12px;
  font-weight: 6px;
  padding: 10px;
  span {
    font-weight: 700;
  }
`
