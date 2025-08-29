import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  FormControl,
  FormControlLabel,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Select,
  Switch,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

const emails = [
  {
    email: "hello@example.com",
    primary: true,
    verified: true,
    unverified: false,
    description:
      "This email address is the default for all notifications and account access.",
  },
  {
    email: "alternative@example.com",
    primary: false,
    verified: true,
    unverified: false,
    description: "",
  },
  {
    email: "alternative-unverified@example.com",
    primary: false,
    verified: false,
    unverified: true,
    description: "",
  },
];

// Reusable Chip component for email status
const EmailChip: React.FC<{
  label: string;
  color: "warning" | "success" | "default";
}> = ({ label, color }) => (
  <Chip
    variant="outlined"
    label={label}
    size="small"
    color={color}
    sx={{ ml: 1 }}
  />
);

// Reusable menu for email actions
const EmailMenu: React.FC<{
  anchorEl: null | HTMLElement;
  open: boolean;
  onClose: () => void;
}> = ({ anchorEl, open, onClose }) => (
  <Menu
    anchorEl={anchorEl}
    open={open}
    onClose={onClose}
    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    transformOrigin={{ vertical: "top", horizontal: "right" }}
  >
    <MenuItem
      onClick={() => {
        alert("Manage is clicked");
        onClose();
      }}
    >
      <ListItemIcon>
        <ManageAccountsIcon fontSize="small" />
      </ListItemIcon>
      <ListItemText>Manage</ListItemText>
    </MenuItem>
    <MenuItem
      onClick={() => {
        alert("Remove is clicked");
        onClose();
      }}
    >
      <ListItemIcon>
        <DeleteOutlineIcon fontSize="small" color="error" />
      </ListItemIcon>
      <ListItemText sx={{ color: "error.main" }}>Remove</ListItemText>
    </MenuItem>
  </Menu>
);

// Reusable row for each email
const EmailRow: React.FC<{
  item: (typeof emails)[0];
  onMenuOpen: (e: React.MouseEvent<HTMLElement>, email: string) => void;
}> = ({ item, onMenuOpen }) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "flex-start",
      px: 3,
      py: 2,
      bgcolor: item.primary ? "rgba(0,0,0,0.01)" : "inherit",
    }}
  >
    <Box sx={{ flexGrow: 1 }}>
      <Typography sx={{ fontWeight: 500 }}>
        {item.email}{" "}
        {item.primary && <EmailChip label="PRIMARY" color="warning" />}
        {item.verified && <EmailChip label="VERIFIED" color="success" />}
        {item.unverified && <EmailChip label="UNVERIFIED" color="default" />}
      </Typography>
      {item.description && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          {item.description}
        </Typography>
      )}
    </Box>
    <IconButton onClick={(e) => onMenuOpen(e, item.email)} sx={{ mt: 0.5 }}>
      <MoreHorizIcon fontSize="small" />
    </IconButton>
  </Box>
);

const PersonalAccount: React.FC = () => {
  const [primaryEmail, setPrimaryEmail] = useState("hello@example.com");
  const [backupEmail, setBackupEmail] = useState("Allow all verified emails");
  const [keepPrivate, setKeepPrivate] = useState(false);
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  return (
    <Box
      sx={{
        maxWidth: 750,
        py: 4,
        px: 3,
        bgcolor: "#fafbfc",
        minHeight: "100vh",
      }}
    >
      {/* Header */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <IconButton onClick={() => window.history.back()} sx={{ mr: 1 }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h6" sx={{ fontWeight: 500, color: "#000" }}>
          Your personal account
        </Typography>
      </Box>

      {/* Emails Section */}
      <Box sx={{ textAlign: "left", ml:'25px' }}>
        <Typography variant="h6" color="text.primary">
          Emails
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Emails you can use to sign in to your account.
        </Typography>
      </Box>
      <Card
        variant="outlined"
        sx={{
          mb: 4,
          borderRadius: 3,
          boxShadow: "0 1px 8px 0 rgba(60,72,88,.06)",
          border: "none",
          textAlign: "left",
        }}
      >
        <CardContent sx={{ p: 0 }}>
          {emails.map((item, idx) => (
            <React.Fragment key={item.email}>
              <EmailRow item={item} onMenuOpen={handleMenuOpen} />
              {idx < emails.length - 1 && <Divider />}
            </React.Fragment>
          ))}
          <EmailMenu
            anchorEl={menuAnchorEl}
            open={Boolean(menuAnchorEl)}
            onClose={handleMenuClose}
          />
        </CardContent>
      </Card>

      {/* Email Settings Section */}
      <Box sx={{ textAlign: "left", ml:'25px' }}>

      <Typography variant="h6" color="text.primary">
        Email settings
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Configure how emails are used in relation to your account.
      </Typography>
      </Box>
      <Card
        variant="outlined"
        sx={{
          borderRadius: 3,
          boxShadow: "0 1px 8px 0 rgba(60,72,88,.06)",
          border: "none",
          textAlign: "left",
        }}
      >
        <CardContent sx={{ p: 0 }}>
          {/* Primary email address */}
          <Box sx={{ display: "flex", alignItems: "center", px: 3, py: 2 }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography sx={{ fontWeight: 500 }}>
                Primary email address
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Select an email to be used for account-related notifications and
                can be used for password reset.
              </Typography>
            </Box>
            <FormControl size="small" sx={{ minWidth: 200 }}>
              <Select
                value={primaryEmail}
                onChange={(e) => setPrimaryEmail(e.target.value)}
              >
                {emails.map((e) => (
                  <MenuItem key={e.email} value={e.email}>
                    {e.email}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Divider />
          {/* Backup email address */}
          <Box sx={{ display: "flex", alignItems: "center", px: 3, py: 2 }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography sx={{ fontWeight: 500 }}>
                Backup email address
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Your backup email address will be used as an additional
                destination for security-relevant account notifications and can
                also be used for password resets.
              </Typography>
            </Box>
            <FormControl size="small" sx={{ minWidth: 200 }}>
              <Select
                value={backupEmail}
                onChange={(e) => setBackupEmail(e.target.value)}
              >
                <MenuItem value="Allow all verified emails">
                  Allow all verified emails
                </MenuItem>
                {emails
                  .filter((e) => e.verified)
                  .map((e) => (
                    <MenuItem key={e.email} value={e.email}>
                      {e.email}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Box>
          <Divider />
          {/* Keep my email addresses private */}
          <Box sx={{ display: "flex", alignItems: "center", px: 3, py: 2 }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography sx={{ fontWeight: 500 }}>
                Keep my email addresses private
              </Typography>
              <Typography variant="body2" color="text.secondary">
                We'll remove your public profile email when performing web-based
                operations and sending email on your behalf.
              </Typography>
            </Box>
            <FormControlLabel
              control={
                <Switch
                  checked={keepPrivate}
                  onChange={(e) => {
                    setKeepPrivate(e.target.checked);
                    alert("Email addresses will be kept private.");
                  }}
                  color="primary"
                />
              }
              label=""
              sx={{ ml: 1 }}
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default PersonalAccount;
