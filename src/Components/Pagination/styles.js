import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

export const PrevButton = styled.button`
  ${props =>
    props.currentPage !== 1
      ? `background: #fff;
        border: none;
        padding: 10px;
        color: blue;
        box-shadow: 0 0 3px rgba(0, 0, 0, 0.4);
        margin: 0 10px;
        cursor: pointer`
      : ` pointer-events: none;
      box-shadow: none;
      color: #999;
      padding: 10px;
      margin: 0 10px;`}
`

export const NextButton = styled.button`
  ${props =>
    props.currentPage === props.pages
      ? `pointer-events: none;
         box-shadow: none;
         color: #999;
         padding: 10px;
         margin: 0 10px;
         `
      : `background: #fff;
         border: none;
         padding: 10px;
         color: blue;
         box-shadow: 0 0 3px rgba(0, 0, 0, 0.4);
         margin: 0 10px;
         cursor: pointer;`}
`

export const PaginationItem = styled.button`
  ${props =>
    props.currentPage === props.item
      ? `border: 1px solid #888;
        color: #888;
        pointer-events: none;
        padding: 10px;
        margin: 0 10px;
         `
      : `background: #fff;
         border: none;
         padding: 10px;
         color: blue;
         box-shadow: 0 0 3px rgba(0, 0, 0, 0.4);
         margin: 0 10px;
         cursor: pointer;`}
`
