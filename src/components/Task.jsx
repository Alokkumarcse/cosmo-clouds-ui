import React, { useEffect, useState } from "react";
import ToggleButton from "./ToggleButton";
import styled from "styled-components";

const Header = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	background-color: lightblue;
	padding: 5px 10px 5px 5px;
	border-radius: 3px;
	margin: 0 20px 20px 20px;
	font-size: 18px;
	font-weight: 500;
	&:hover {
		background-color: lightgrey;
	}
`;

const Container = styled.div`
	display: flex;
`;

const Wrapper = styled.div`
	display: flex;
	gap: 30px;
	margin-top: 7px;
	background-color: lightgrey;
	padding: 5px;
	border-radius: 3px;
`;

const Input = styled.input`
	padding: 5px;
	font-size: 16px;
	border: none;
`;

const Select = styled.select`
	cursor: pointer;
	padding: 4.5px;
	font-size: 16px;
	border: none;
`;

const InputContainer = styled.div`
	flex: 2;
	display: flex;
	align-items: center;
`;

const ButtonContainer = styled.div`
	flex: 1;
	display: ${({ show }) => (show ? "flex" : "none")};
	transition: all 1s ease-in-out;
`;

const Buttons = styled.div`
	display: flex;
	align-items: center;
	gap: 10px;
`;

const Span = styled.span`
	cursor: pointer;
	font-weight: 400;
`;

const Task = ({ db, handleInsertNode, handleDeleteNode, handleUpdateNode }) => {
	const [inputValue, setInputValue] = useState(db.name);
	const [inputType, setInputType] = useState(db.type);
	const [show, setShow] = useState(false);

	// Method for handle the add Data
	function onAddData() {
		// console.log("invoked add method", db.id);
		handleInsertNode(db.id);
	}

	// Method for handle the remove Data
	function handleDeleteData() {
		// console.log("invoked delete method", db.id);
		handleDeleteNode(db.id);
	}

	// Method for handle update Data
	function handleSaveChange(e) {
		// e.preventDefault();
		if (e.key === "Enter") {
			// console.log(e.key);
			e.target.blur();
			handleUpdateData(inputValue, inputType);
		}
	}
	function handleUpdateData(inputValue, inputType) {
		// console.log("update method");
		// console.log(db);
		handleUpdateNode(db.id, inputValue, inputType);
	}

	// tree ui of data list
	if (db.type === "object") {
		return (
			<div style={{ marginLeft: db.id === 1 ? 0 : 20 }}>
				{db.id === 1 ? (
					<Header>
						<span>Field value and type</span>
						<Span onClick={() => onAddData()}>
							<i className="bi bi-plus-circle"></i>
						</Span>
					</Header>
				) : (
					<Container>
						<Wrapper
							onMouseEnter={() => setShow(true)}
							onMouseLeave={() => setShow(false)}
						>
							<InputContainer>
								<Input
									type="text"
									value={inputValue}
									onKeyDown={(e) => handleSaveChange(e)}
									onChange={(e) => setInputValue(e.target.value)}
								/>
								<Select
									value={inputType}
									onChange={(e) => {
										setInputType(e.target.value);
										e.target.blur();
										handleUpdateData(inputValue, e.target.value);
									}}
								>
									<option>object</option>
									<option>string</option>
									<option>boolean</option>
									<option>integer</option>
								</Select>
							</InputContainer>
							<ButtonContainer show={show}>
								<Buttons>
									<span>Required</span>
									<ToggleButton />
									<Span onClick={() => onAddData()}>
										<i className="bi bi-plus-circle"></i>
									</Span>
									<Span onClick={() => handleDeleteData()}>
										<i className="bi bi-trash3"></i>
									</Span>
								</Buttons>
							</ButtonContainer>
						</Wrapper>
					</Container>
				)}
				{/* Recursive rendering Task component to show all nested filed */}
				{db.items.length === 0
					? null
					: db.items.map((filed) => {
							return (
								<Task
									key={filed.id}
									db={filed}
									handleInsertNode={handleInsertNode}
									handleDeleteNode={handleDeleteNode}
									handleUpdateNode={handleUpdateNode}
								/>
							);
					  })}
			</div>
		);
	} else {
		return (
			<Wrapper
				style={{ marginLeft: 20 }}
				onMouseEnter={() => setShow(true)}
				onMouseLeave={() => setShow(false)}
			>
				<InputContainer>
					<Input
						type="text"
						value={inputValue}
						onKeyDown={(e) => handleSaveChange(e)}
						onChange={(e) => setInputValue(e.target.value)}
					/>
					<Select
						value={inputType}
						onChange={(e) => {
							setInputType(e.target.value);
							e.target.blur();
							handleUpdateData(inputValue, e.target.value);
						}}
					>
						<option>object</option>
						<option>string</option>
						<option>boolean</option>
						<option>integer</option>
					</Select>
				</InputContainer>
				<ButtonContainer show={show}>
					<Buttons>
						<span>Required</span>
						<ToggleButton />
						<Span onClick={() => handleDeleteData()}>
							<i className="bi bi-trash3"></i>
						</Span>
					</Buttons>
				</ButtonContainer>
			</Wrapper>
		);
	}
};

export default Task;
