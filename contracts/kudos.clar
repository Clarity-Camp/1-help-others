
;; kudos
;; contract that allows users to give each other "kudos"

(define-constant CONTRACT_OWNER (as-contract tx-sender))
(define-constant PRICE u1000000)
(define-constant ERR_NO_KUDOS (err u100))
(define-constant ERR_CANNOT_GIVE_SELF (err u101))

(define-map kudosMap principal uint)

;; private functions
;;


;; public functions
;;

;; @function give-kudos-with-tip: user can give kudos to another user without tip
;; 1. Any user can give kudos to another user by paying 1 STX or PRICE to the contract owner
;; 2. Updates the count of kudos that user received
;; @param recipient:principal :: the user who you would want to tip
;; @response (ok bool) Return true when successful
(define-public (give-kudos (recipient principal))
  ;; IMPLEMENT HERE
)

;; @function give-kudos-with-tip: user can give kudos to another user plus a tip
;; 1. Any user can give kudos to another user by paying 1 STX to  the contract owner
;; 2. Additional tip can be paid by the user to the recipient 
;; 3. Updates the count of kudos that user is getting
;; @param recipient:principal :: user you want to give kudos to
;; @param tip:uint :: extra tip you want to give to the user
;; @response (ok bool) Returns true after successful update
(define-public (give-kudos-with-tip (recipient principal) (tip uint))
  ;; IMPLEMENT HERE
)


;; read-only functions
;;

(define-read-only (get-kudos)
    (ok (unwrap! (map-get? kudosMap tx-sender) ERR_NO_KUDOS))
) 
