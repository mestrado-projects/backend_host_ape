import type { NextFunction, Request, Response } from "express"
import { UserRole } from "../models/index.js"

export function requireRole(allowedRoles: UserRole[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = res.locals.user

    if (!user) {
      res.status(401).json({ message: "Unauthorized" })
      return
    }

    const hasRequiredRole = allowedRoles.some((role) => user.roles.includes(role))

    if (!hasRequiredRole) {
      res.status(403).json({
        message: "Forbidden",
        details: `Access denied. Required roles: ${allowedRoles.join(", ")}`,
      })
      return
    }

    next()
  }
}

export function requireAdmin() {
  return requireRole([UserRole.ROLE_ADMIN])
}

export function requireGuest() {
  return requireRole([UserRole.ROLE_GUEST])
}

export function requireAnyRole() {
  return requireRole([UserRole.ROLE_ADMIN, UserRole.ROLE_GUEST])
}

export function requireGuestProfile() {
  return async (req: Request, res: Response, next: NextFunction) => {
    const user = res.locals.user

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" })
    }

    // Check if user has ROLE_GUEST
    if (!user.role.includes(UserRole.ROLE_GUEST)) {
      return res.status(403).json({
        message: "Forbidden",
        details: "Guest profile required",
      })
    }

    // Check if user has a guest profile
    if (!user.guest) {
      return res.status(403).json({
        message: "Forbidden",
        details: "Guest profile not found. Please complete your guest registration.",
      })
    }

    // Add guest to locals for easy access
    res.locals.guest = user.guest
    next()
  }
}
