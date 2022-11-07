import { Clarinet, Tx, Chain, Account, types } from 'https://deno.land/x/clarinet@v0.31.0/index.ts';
import { assertEquals } from 'https://deno.land/std@0.90.0/testing/asserts.ts';

Clarinet.test({
    name: "A user can receive single kudos with tip",
    async fn(chain: Chain, accounts: Map<string, Account>) {

        const deployer = accounts.get('deployer')!.address;
        const user1 = accounts.get('wallet_1')!.address;
        const user2 = accounts.get('wallet_2')!.address;

        let block = chain.mineBlock([
            Tx.contractCall(
                'kudos',
                'give-kudos-with-tip',
                [types.principal(user1), types.uint(500000)],
                user2
            )
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 2);
        assertEquals(block.receipts[0].events[0].stx_transfer_event.recipient, deployer.concat(".kudos"))
        assertEquals(block.receipts[0].events[0].stx_transfer_event.amount, "1000000")
        assertEquals(block.receipts[0].events[1].stx_transfer_event.recipient, user1)
        assertEquals(block.receipts[0].events[1].stx_transfer_event.amount, "500000")

        const kudosReceived = chain.callReadOnlyFn(
            'kudos',
            'get-kudos',
            [],
            user1
        )
        assertEquals(kudosReceived.result, types.ok(types.uint(1)));
    },
});

Clarinet.test({
    name: "A user can receive single kudos without tip",
    async fn(chain: Chain, accounts: Map<string, Account>) {

        const deployer = accounts.get('deployer')!.address;
        const user1 = accounts.get('wallet_1')!.address;
        const user2 = accounts.get('wallet_2')!.address;

        let block = chain.mineBlock([
            Tx.contractCall(
                'kudos',
                'give-kudos',
                [types.principal(user1)],
                user2
            )
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 2);
        assertEquals(block.receipts[0].events[0].stx_transfer_event.recipient, deployer.concat(".kudos"))
        assertEquals(block.receipts[0].events[0].stx_transfer_event.amount, "1000000")

        const kudosReceived = chain.callReadOnlyFn(
            'kudos',
            'get-kudos',
            [],
            user1
        )
        assertEquals(kudosReceived.result, types.ok(types.uint(1)));
    },
});

Clarinet.test({
    name: "A user can receive multiple kudos with and without tip from one user",
    async fn(chain: Chain, accounts: Map<string, Account>) {

        const deployer = accounts.get('deployer')!.address;
        const user1 = accounts.get('wallet_1')!.address;
        const user2 = accounts.get('wallet_2')!.address;

        let block = chain.mineBlock([
            Tx.contractCall(
                'kudos',
                'give-kudos-with-tip',
                [types.principal(user1), types.uint(1000000)],
                user2
            ),
            Tx.contractCall(
                'kudos',
                'give-kudos',
                [types.principal(user1)],
                user2
            ),
            Tx.contractCall(
                'kudos',
                'give-kudos-with-tip',
                [types.principal(user1), types.uint(3000000)],
                user2
            )
        ]);
        assertEquals(block.receipts.length, 3);
        assertEquals(block.height, 2);
        assertEquals(block.receipts[0].events[0].stx_transfer_event.recipient, deployer.concat(".kudos"))
        assertEquals(block.receipts[0].events[0].stx_transfer_event.amount, "1000000")
        assertEquals(block.receipts[0].events[1].stx_transfer_event.recipient, user1)
        assertEquals(block.receipts[0].events[1].stx_transfer_event.amount, "1000000")

        const kudosReceived = chain.callReadOnlyFn(
            'kudos',
            'get-kudos',
            [],
            user1
        )
        assertEquals(kudosReceived.result, types.ok(types.uint(3)));
    },
});

Clarinet.test({
    name: "A user can receive multiple kudos with or without tip from multiple users",
    async fn(chain: Chain, accounts: Map<string, Account>) {

        const deployer = accounts.get('deployer')!.address;
        const user1 = accounts.get('wallet_1')!.address;
        const user2 = accounts.get('wallet_2')!.address;
        const user3 = accounts.get('wallet_3')!.address;

        let block = chain.mineBlock([
            Tx.contractCall(
                'kudos',
                'give-kudos-with-tip',
                [types.principal(user1), types.uint(8000000)],
                user2
            ),
            Tx.contractCall(
                'kudos',
                'give-kudos',
                [types.principal(user1)],
                user2
            ),
            Tx.contractCall(
                'kudos',
                'give-kudos-with-tip',
                [types.principal(user1), types.uint(1000000)],
                user3
            ),
            Tx.contractCall(
                'kudos',
                'give-kudos',
                [types.principal(user1)],
                user3
            )
        ]);
        assertEquals(block.receipts.length, 4);
        assertEquals(block.height, 2);
        assertEquals(block.receipts[0].events[0].stx_transfer_event.recipient, deployer.concat(".kudos"))
        assertEquals(block.receipts[0].events[0].stx_transfer_event.amount, "1000000")
        assertEquals(block.receipts[0].events[1].stx_transfer_event.recipient, user1)
        assertEquals(block.receipts[0].events[1].stx_transfer_event.amount, "8000000")

        const kudosReceived = chain.callReadOnlyFn(
            'kudos',
            'get-kudos',
            [],
            user1
        )
        assertEquals(kudosReceived.result, types.ok(types.uint(4)));
    },
});

Clarinet.test({
    name: "Multiple users can give and receive kudos with or without tip",
    async fn(chain: Chain, accounts: Map<string, Account>) {

        const deployer = accounts.get('deployer')!.address;
        const user1 = accounts.get('wallet_1')!.address;
        const user2 = accounts.get('wallet_2')!.address;
        const user3 = accounts.get('wallet_3')!.address;

        let block = chain.mineBlock([
            Tx.contractCall(
                'kudos',
                'give-kudos-with-tip',
                [types.principal(user2), types.uint(1000000)],
                user1
            ),
            Tx.contractCall(
                'kudos',
                'give-kudos',
                [types.principal(user1)],
                user2
            ),
            Tx.contractCall(
                'kudos',
                'give-kudos-with-tip',
                [types.principal(user3), types.uint(3000000)],
                user2
            ),
            Tx.contractCall(
                'kudos',
                'give-kudos',
                [types.principal(user1)],
                user3
            ),
            Tx.contractCall(
                'kudos',
                'give-kudos',
                [types.principal(user2)],
                user3
            )
        ]);
        assertEquals(block.receipts.length, 5);
        assertEquals(block.height, 2);

        const kudosReceivedUser1 = chain.callReadOnlyFn(
            'kudos',
            'get-kudos',
            [],
            user1
        )
        assertEquals(kudosReceivedUser1.result, types.ok(types.uint(2)));

        const kudosReceivedUser2 = chain.callReadOnlyFn(
            'kudos',
            'get-kudos',
            [],
            user2
        )
        assertEquals(kudosReceivedUser2.result, types.ok(types.uint(2)));

        const kudosReceivedUser3 = chain.callReadOnlyFn(
            'kudos',
            'get-kudos',
            [],
            user3
        )
        assertEquals(kudosReceivedUser3.result, types.ok(types.uint(1)));
    },
});

Clarinet.test({
    name: "A user cannot give self kudos without tip",
    async fn(chain: Chain, accounts: Map<string, Account>) {

        const user1 = accounts.get('wallet_1')!.address;

        let block = chain.mineBlock([
            Tx.contractCall(
                'kudos',
                'give-kudos',
                [types.principal(user1)],
                user1
            )
        ]);
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 2);
        assertEquals(block.receipts[0].result, "(err u101)")

        const kudosReceived = chain.callReadOnlyFn(
            'kudos',
            'get-kudos',
            [],
            user1
        )
        assertEquals(kudosReceived.result, types.err(types.uint(100)));
    },
});
