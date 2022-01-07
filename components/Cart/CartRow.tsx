import {ICartItem} from 'boundless-api-client';
import Link from 'next/link';
import {formatMoney} from '../../lib/formatter';
import {getCartImg} from '../../lib/services/imgs';
import {getProductUrl} from '../../lib/services/urls';

export default function CartRow({item, rmItem, onQtyChange}: ICartRowProps) {
	return (
		<div className='row mb-2 py-3'>
			<div className='col-md-4 d-flex mb-2 align-items-start'>
				<Link href={getProductUrl(item.vwItem.product)}>
					<a className='d-flex'>
						{item.vwItem?.image?.path
							? <div className='img me-2'>
								<img src={getCartImg(item.vwItem?.image?.path)}
									alt={item.vwItem?.product?.title}
								/>
							</div>
							: <div className='no-image' />}
						<div className='py-1'>{item.vwItem?.product?.title || ''}</div>
					</a>
				</Link>
			</div>
			<div className='col-md-2 text-start text-md-center mb-2 py-1'>
				<span className='d-inline d-md-none'><strong>Price: </strong></span>
				{formatMoney(item.itemPrice.final_price)}
			</div>
			<div className='col-md-2 text-start text-md-center mb-2'>
				<span className='d-inline d-md-none'><strong>Qty: </strong></span>
				<div className='cart-qty-input input-group input-group-sm d-inline-flex'>
					<button
						className='btn btn-outline-secondary text-center'
						type='button'
						style={{width: 25}}
						disabled={item.qty < 2}
						onClick={() => onQtyChange(item.qty - 1)}
					><>&ndash;</></button>
					<input
						type='number'
						className='form-control form-control-sm text-center'
						name={`qty[${item.item_id}]`}
						value={item.qty}
						min={1}
						onChange={(e) => onQtyChange(Number(e.target.value) || 0)}
					/>
					<button
						className='btn btn-outline-secondary text-center'
						type='button'
						style={{width: 25}}
						onClick={() => onQtyChange(item.qty + 1)}
					>+</button>
				</div>
			</div>
			<div className='col-md-2 text-start text-md-center mb-2 py-1'>
				<span className='d-inline d-md-none'><strong>Total: </strong></span>
				{formatMoney(parseInt(item.itemPrice.final_price || '') * item.qty)}</div>
			<div className='col-md-2 text-start text-md-center mb-2'>
				<button
					className='btn btn-sm btn-outline-secondary'
					onClick={rmItem}
				>
					Remove
				</button>
			</div>
		</div>
	);
}

interface ICartRowProps {
	item: ICartItem;
	rmItem: () => void;
	onQtyChange: (qty: number) => void
}