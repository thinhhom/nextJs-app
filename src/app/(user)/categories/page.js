import Link from 'next/link';
import React from 'react';

export default async function Categories(props) {
    return (
        <>
            {props.data.map((category) => {
                const { _id, name, image, status } = category;
                return (
                        <ul className="mt-3" key={_id}>
                            <li><Link href={`/shop/productByCate/${_id}`}>{name}</Link><span>(83)</span></li>
                        </ul>
                );
            })}
        </>
    );
}