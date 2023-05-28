import React, {useState} from 'react'
import { useFilterContext } from '../context/filter_context';
import styled from 'styled-components';
import { FaCheck } from "react-icons/fa";
import FormatPrice from "../Helpers/FormatPrice"
import { Button } from "../styles/Button";


const FilterSection = () => {
  const { filters: {text, category, color, price, maxPrice, minPrice}, updateFilterValue, all_products, clearFilters } = useFilterContext();

  const getUniqueData = (data, property) => {
    let newVal = data.map( (curEl)=> {
      return curEl[property];
    })
    if(property ==='colors'){
      //return (newVal = [ 'All', ...new Set([].concat( ...newVal)) ] )
      newVal = newVal.flat();
    }
    return (newVal = [ 'All',...new Set(newVal) ])

  }
  const categoryOnlyData = getUniqueData(all_products, "category")
  const companyData = getUniqueData(all_products, "company")
  const colorData = getUniqueData(all_products, "colors")
  console.log('colorData',colorData)
  return (
    <Wrapper>  
      <div className="filter-search">
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            name="text"
            placeholder="Search"
            value={text}
            onChange={updateFilterValue}
          />
        </form>
      </div>

      <div className="filter-category">
        <h3>category</h3>
        <div>
          {
            categoryOnlyData.map( (curEl, index)=>{
              return <button
                key={index} type='button' name='category' value={curEl} onClick={updateFilterValue}> {curEl} </button>
            })
          }
        </div>
      </div>
      <div className="filter-company">
        <h3>Company</h3>
        <div>
          <form action="#">
            <label htmlFor="company"></label>
            <select
              name="company"
              id="company"
              className="filter-company--select"
              onClick={updateFilterValue}>
              {
                companyData.map( (cEle, index) => {    
                return <option key={index} value={cEle}>{cEle}</option>
                })
              }
            </select>
          </form>
        </div>
      </div>
      <div className="filter-colors">
        <h3>color</h3>
        <div className='filter-color-style'>
          {
            colorData.map( (curEl, index)=>{
              if(curEl === 'All'){
                return <button 
                key={index} type='button' name='color' value={curEl} onClick={updateFilterValue} className='color-all--style'>
                   All 
                   </button>
              }else{
                return <button 
                key={index} type='button' name='color' value={curEl} style={{backgroundColor:curEl}} onClick={updateFilterValue} className='btnStyle'>
                   { color === curEl ? <FaCheck className="checkStyle" /> : null  } 
                   </button>
              }
            })
          }
        </div>
      </div>
      <div className='filter-color'>
          <h3>Price</h3>
          <div>
            <p>
              <FormatPrice price={price} />
            </p>
            <input type="range" min={minPrice} max={maxPrice} value={price} name='price' onChange={updateFilterValue} />
          </div>
      </div>

      <div className='filter-clear'>
          <Button className="btn" onClick={clearFilters}>
            Clear Filters
          </Button>  
      </div>


    </Wrapper>
  )
}

const Wrapper = styled.section`
  padding: 5rem 0;
  display: flex;
  flex-direction: column;
  gap: 3rem;

  h3 {
    padding: 2rem 0;
    font-size: bold;
  }

  .filter-search {
    input {
      padding: 0.6rem 1rem;
      width: 80%;
    }
  }

  .filter-category {
    div {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 1.4rem;

      button {
        border: none;
        background-color: ${({ theme }) => theme.colors.white};
        text-transform: capitalize;
        cursor: pointer;

        &:hover {
          color: ${({ theme }) => theme.colors.btn};
        }
      }

      .active {
        border-bottom: 1px solid #000;
        color: ${({ theme }) => theme.colors.btn};
      }
    }
  }

  .filter-company--select {
    padding: 0.3rem 1.2rem;
    font-size: 1.6rem;
    color: ${({ theme }) => theme.colors.text};
    text-transform: capitalize;
  }

  .filter-color-style {
    display: flex;
    justify-content: center;
  }

  .color-all--style {
    background-color: transparent;
    text-transform: capitalize;
    border: none;
    cursor: pointer;
  }
  .btnStyle {
    width: 2rem;
    height: 2rem;
    background-color: #000;
    border-radius: 50%;
    margin-left: 1rem;
    border: none;
    outline: none;
    opacity: 0.5;
    cursor: pointer;

    &:hover {
      opacity: 1;
    }
  }

  .active {
    opacity: 1;
  }

  .checkStyle {
    font-size: 1rem;
    color: #fff;
  }

  .filter_price {
    input {
      margin: 0.5rem 0 1rem 0;
      padding: 0;
      box-shadow: none;
      cursor: pointer;
    }
  }

  .filter-shipping {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .filter-clear .btn {
    background-color: #ec7063;
    color: #000;
  }
`;

export default FilterSection;