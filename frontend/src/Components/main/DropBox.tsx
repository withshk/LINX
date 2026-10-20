import styled from "@emotion/styled";
import { useEffect, useRef, useState } from "react";
import type { SortOption } from "../types/link";

interface SortDropdownProps {
    value: SortOption;
    onChange: (value: SortOption) => void;
}

const OPTIONS: { value: SortOption; label: string }[] = [
    { value: "latest", label: "최신순" },
    { value: "oldest", label: "오래된 순" },
    { value: "mostClicked", label: "최다 방문 순" },
    { value: "leastClicked", label: "최저 방문 순" }, // 4개의 항목을 배열로 정의
];

export function SortDropdown({ value, onChange }: SortDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const wrapRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isOpen) return;
        const handleClickOutside = (e: MouseEvent) => {
            if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) { 
                setIsOpen(false);
            } // 현재 선택한 것이 dropdown이 컴포넌트가 아닐때는 isOpen을 false로 변경하여 닫음
        };
        document.addEventListener("mousedown", handleClickOutside); // 마우스가 클릭했을때 handleClickOutside라는 함수 실행
        return () => document.removeEventListener("mousedown", handleClickOutside);  // 기존에 있던 데이터를 정리하는 함수
    }, [isOpen]);

    const currentLabel = OPTIONS.find((o) => o.value === value)?.label ?? "최신순"; //OPTIONS안에서 o의 값이 props로 받은 값이랑 같은지 비교해서 반환, 왼쪽이 null이거나 undefind면 최신순을 반환

    return (
        <Wrap ref={wrapRef}> 
            <Trigger onClick={() => setIsOpen((prev) => !prev)}> 
                <span>▼</span>
                <p>{currentLabel}</p>
            </Trigger>
            {isOpen && (
                <Menu>
                    {OPTIONS.map((option) => (
                            <MenuItem
                                key={option.value}
                                selected={option.value === value}
                                onClick={() => {
                                    onChange(option.value); // 클릭했을때 클릭한 값으로 바뀜
                                    setIsOpen(false); // 누른뒤 목록이 꺼짐
                                }}
                            >
                                {option.label}
                            </MenuItem>
                    ))}
                </Menu>
            )}
        </Wrap>
    );
}

const Wrap = styled.div`
    position: relative;
    overflow: visible;
    
`;
const Trigger = styled.div`
    width: 110px;
    height: 40px;
    border: #DADADA solid 2px;
    border-radius: 8px;

    display: flex;
    align-items: center;
    gap: 8px;
    padding-left: 12px;
    cursor: pointer;
    font-size: 14px;
    color: #636363;

    span {
        font-size: 10px;
    }
`;
const Menu = styled.div`
    position: absolute;
    top: 45px;
    left: 0;
    width: 130px;
    background-color: #fff;
    border: #DADADA solid 2px;
    border-radius: 8px;
    box-shadow: 0px 4px 10px rgba(0,0,0,0.08);
    overflow: hidden;
    z-index: 10;
    
`;
const MenuItem = styled.div<{ selected?: boolean }>`
    height: 40px;
    display: flex;
    align-items: center;
    padding-left: 14px;
    font-size: 15px;
    cursor: pointer;
    color: ${({ selected }) => (selected ? "#000" : "#B0B0B0")};
    font-weight: ${({ selected }) => (selected ? 600 : 400)};

    &:hover {
        background-color: #FFF3F8;
    }
`;